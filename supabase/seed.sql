-- =============================================================
-- Sintonía UNAM — Datos iniciales
-- Ejecuta DESPUÉS de schema.sql
-- =============================================================

-- ---------- 20 preguntas (5 dimensiones × 4) ----------
insert into public.questions (dimension, question_text, is_reverse_scored, sort_order, active) values
  -- Estado emocional
  ('estado_emocional',         'En los últimos días, ¿con qué frecuencia te has sentido triste o desanimado(a)?', false, 1,  true),
  ('estado_emocional',         '¿Has sentido nervios o preocupación que te cuesta calmar?',                       false, 2,  true),
  ('estado_emocional',         '¿Has logrado disfrutar momentos pequeños de tu día a día?',                       true,  3,  true),
  ('estado_emocional',         '¿Has podido reconocer cómo te sientes y darle nombre a tus emociones?',           true,  4,  true),
  -- Estrés académico
  ('estres_academico',         '¿Has sentido que tus actividades académicas o personales te rebasan?',            false, 5,  true),
  ('estres_academico',         '¿Te ha costado concentrarte al estudiar o atender tus clases?',                   false, 6,  true),
  ('estres_academico',         '¿Has logrado organizar tu tiempo entre estudio, descanso y vida personal?',       true,  7,  true),
  ('estres_academico',         '¿Has podido afrontar exámenes o entregas con relativa calma?',                    true,  8,  true),
  -- Sueño y descanso
  ('sueno_descanso',           '¿Has logrado descansar lo suficiente para realizar tus actividades cotidianas?',  true,  9,  true),
  ('sueno_descanso',           '¿Has mantenido un horario de sueño relativamente constante?',                     true,  10, true),
  ('sueno_descanso',           '¿Te has despertado cansado(a) o con poca energía?',                               false, 11, true),
  ('sueno_descanso',           '¿Has tenido dificultad para conciliar el sueño o has dormido inquieto(a)?',       false, 12, true),
  -- Convivencia y apoyo social
  ('apoyo_social',             '¿Has contado con alguien con quien hablar cuando lo necesitas?',                  true,  13, true),
  ('apoyo_social',             '¿Has compartido tiempo con familiares o amistades que te hacen bien?',            true,  14, true),
  ('apoyo_social',             '¿Te has sentido solo(a) o con poca conexión con quienes te rodean?',              false, 15, true),
  ('apoyo_social',             '¿Has evitado actividades sociales que antes disfrutabas?',                        false, 16, true),
  -- Motivación y pertenencia
  ('motivacion_pertenencia',   '¿Has sentido motivación para participar en tus actividades universitarias?',      true,  17, true),
  ('motivacion_pertenencia',   '¿Has tenido momentos para realizar actividades que te ayuden a sentirte mejor?',  true,  18, true),
  ('motivacion_pertenencia',   '¿Te has sentido parte de tu comunidad universitaria?',                            true,  19, true),
  ('motivacion_pertenencia',   '¿Has perdido interés o entusiasmo por metas que antes te importaban?',            false, 20, true)
on conflict do nothing;

-- ---------- Recomendaciones por dimensión y nivel ----------
insert into public.recommendations (dimension, level, title, description, active) values
  ('estado_emocional', 'bajo',        'Sigue cultivando tus rutinas de bienestar', 'Tus respuestas sugieren un buen equilibrio emocional. Pequeñas pausas, gratitud diaria o momentos de movimiento te ayudarán a sostenerlo.', true),
  ('estado_emocional', 'moderado',    'Espacio para reconocer tus emociones',      'Considera dedicar 10 minutos al día a registrar lo que sientes. Conversar con alguien de confianza puede aportar perspectiva.', true),
  ('estado_emocional', 'prioritario', 'Acércate a un servicio universitario',      'Sentir tristeza o nervios sostenidos amerita acompañamiento. Contacta los servicios de orientación psicológica de tu plantel.', true),

  ('estres_academico', 'bajo',        'Tu carga académica parece manejable',       'Conserva tus rutinas de organización; bloques de estudio cortos pueden sostener este ritmo.', true),
  ('estres_academico', 'moderado',    'Pequeños ajustes para liberar presión',     'Prioriza tareas con la técnica de los 3 más importantes del día y agrega pausas activas de 5 minutos cada hora.', true),
  ('estres_academico', 'prioritario', 'Considera apoyo académico y orientación',   'Sentirte rebasado(a) puede afectar tu desempeño. Las tutorías académicas y la orientación universitaria son un buen primer paso.', true),

  ('sueno_descanso',   'bajo',        'Tu descanso es un recurso valioso',         'Continúa cuidando tus horarios de sueño y exposición a pantallas. Tu energía agradecerá la consistencia.', true),
  ('sueno_descanso',   'moderado',    'Refuerza tu higiene del sueño',             'Apaga pantallas 30 minutos antes de dormir, mantén tu habitación fresca y evita cafeína después del mediodía.', true),
  ('sueno_descanso',   'prioritario', 'El descanso necesita atención',             'Dormir mal de forma sostenida impacta tu ánimo y concentración. Considera consultar con servicios médicos universitarios.', true),

  ('apoyo_social',     'bajo',        'Tu red de apoyo te acompaña',               'Mantener vínculos cercanos es protector. Procura escuchar a quienes te rodean tanto como ellos te escuchan a ti.', true),
  ('apoyo_social',     'moderado',    'Reconecta con personas de confianza',       'Una llamada o un café con alguien cercano puede reforzar tu bienestar. Las actividades comunitarias también ayudan.', true),
  ('apoyo_social',     'prioritario', 'Buscar compañía es un acto de cuidado',     'Sentirte aislado(a) merece atención. Considera unirte a actividades culturales o deportivas, o a grupos de orientación.', true),

  ('motivacion_pertenencia', 'bajo',        'Tu motivación es un buen aliado',     'Conserva los proyectos y actividades que te dan propósito. Compartirlos con otros lo amplifica.', true),
  ('motivacion_pertenencia', 'moderado',    'Reactiva pequeños propósitos',        'Establece una meta sencilla esta semana: una clase opcional, una actividad cultural o una salida nueva por tu campus.', true),
  ('motivacion_pertenencia', 'prioritario', 'Espacios universitarios para reencontrarte', 'Talleres, deporte, voluntariado y actividades culturales pueden reabrir el sentido de pertenencia.', true)
on conflict do nothing;

-- ---------- Recursos universitarios ----------
insert into public.resources (name, type, description, audience, modality, location, schedule, contact, tags, active) values
  ('Unidad de Evaluación Psicológica Iztacala (UEPI)', 'orientacion_psicologica',
   'Acompañamiento psicológico para la comunidad universitaria. Atención individual y grupal.',
   'Estudiantes UNAM', 'Presencial / a distancia', 'FES Iztacala', 'Lunes a viernes, 9:00 a 17:00',
   'uepi@iztacala.unam.mx', '["psicologia","atencion","orientacion"]'::jsonb, true),

  ('Programa Institucional de Tutorías', 'tutoria_academica',
   'Tutorías académicas y de trayectoria escolar. Acompañamiento para mejorar tu desempeño.',
   'Estudiantes UNAM', 'Presencial', 'Tu facultad o escuela', 'Según agenda del tutor',
   'Coordinación de tutorías de tu plantel', '["academico","tutoria","desempeno"]'::jsonb, true),

  ('Activación física comunitaria', 'deporte',
   'Sesiones abiertas de yoga, baile y movimiento físico en explanadas universitarias.',
   'Comunidad UNAM', 'Presencial', 'Explanadas en distintos planteles', 'Martes y jueves, 8:00',
   'Difusión cultural y deportiva', '["deporte","movimiento","comunidad"]'::jsonb, true),

  ('Talleres culturales', 'cultura',
   'Talleres de música, escritura, pintura y teatro abiertos a estudiantes.',
   'Estudiantes UNAM', 'Presencial', 'Casa del Tiempo y centros culturales', 'Calendario semestral',
   'Difusión cultural UNAM', '["arte","cultura","comunidad"]'::jsonb, true),

  ('Círculos de bienestar Sintonía', 'comunidad',
   'Encuentros guiados para compartir experiencias y construir comunidad.',
   'Estudiantes UNAM', 'Presencial', 'Tu plantel', 'Miércoles 17:00',
   'sintonia@unam.mx', '["comunidad","apoyo","pertenencia"]'::jsonb, true),

  ('Servicios médicos universitarios', 'medico',
   'Consulta médica general gratuita para personal y estudiantes.',
   'Comunidad UNAM', 'Presencial', 'Centros médicos por plantel', 'Lunes a viernes',
   'Servicios médicos de tu plantel', '["salud","medicina"]'::jsonb, true),

  ('Línea de la Vida (24/7)', 'emergencia',
   'Servicio de orientación emocional gratuito y confidencial, disponible las 24 horas.',
   'Cualquier persona', 'Telefónica', 'Nacional', '24 horas, todos los días',
   '800 290 0024', '["emergencia","crisis","apoyo"]'::jsonb, true),

  ('Bienestar verde — caminatas y jardines', 'sustentabilidad',
   'Actividades en espacios verdes universitarios: caminatas, jardines polinizadores, talleres de plantas medicinales.',
   'Comunidad UNAM', 'Presencial', 'Ciudad Universitaria', 'Sábados 10:00',
   'sustentabilidad@unam.mx', '["sustentabilidad","naturaleza","autocuidado"]'::jsonb, true)
on conflict do nothing;
