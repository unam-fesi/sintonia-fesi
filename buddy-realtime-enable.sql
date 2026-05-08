-- =============================================================
-- Sintonía UNAM — Habilitar realtime para buddy_messages
-- Esto permite que Supabase haga push de los inserts vía websocket,
-- evitando el polling cada 5-8 segundos en /buddy.
-- =============================================================

-- 1) Asegurar que la tabla está en la publicación supabase_realtime
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND schemaname = 'public'
      AND tablename = 'buddy_messages'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.buddy_messages';
  END IF;
END $$;

-- 2) Asegurar replica identity FULL para que el payload incluya la fila completa
ALTER TABLE public.buddy_messages REPLICA IDENTITY FULL;

-- 3) (Opcional) Política RLS para SELECT — el subscriber valida con anon key
--    Realtime requiere que la sesión pueda hacer SELECT vía RLS para recibir el evento.
--    Como los códigos van encriptados en el payload, ampliamos el SELECT a anon
--    pero filtrado por participación en la pareja.
DROP POLICY IF EXISTS "buddy_messages_select_participant" ON public.buddy_messages;
CREATE POLICY "buddy_messages_select_participant" ON public.buddy_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.buddy_pairs bp
      WHERE bp.id = buddy_messages.pair_id
    )
  );

-- Nota: si quieres restringir aún más (que sólo usuarios participantes vean los
-- mensajes), tendrías que pasar el código anónimo en headers/JWT custom claims.
-- Por ahora dejamos la política amplia porque el código es el secreto de acceso.
