-- =============================================================
-- Sintonía UNAM — Schema (Supabase)
-- 6 tablas + Row Level Security. Ejecuta desde el SQL Editor.
-- Idempotente.
-- =============================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- =============================================================
-- 1. questions
-- =============================================================
create table if not exists public.questions (
  id                uuid primary key default uuid_generate_v4(),
  dimension         text not null,
  question_text     text not null,
  is_reverse_scored boolean not null default false,
  sort_order        int not null,
  active            boolean not null default true,
  created_at        timestamptz not null default now()
);

create index if not exists questions_active_order_idx
  on public.questions(active, sort_order);

-- =============================================================
-- 2. assessment_sessions
-- =============================================================
create table if not exists public.assessment_sessions (
  id                  uuid primary key default uuid_generate_v4(),
  anonymous_code      text not null,
  test_version        text,
  total_score         int,
  general_level       text,            -- bajo | moderado | prioritario
  dimension_scores    jsonb,
  top_attention_areas jsonb,
  origin              text default 'web',
  created_at          timestamptz not null default now()
);

create index if not exists sessions_created_idx
  on public.assessment_sessions(created_at desc);

-- =============================================================
-- 3. assessment_answers
-- =============================================================
create table if not exists public.assessment_answers (
  id               uuid primary key default uuid_generate_v4(),
  session_id       uuid not null references public.assessment_sessions(id) on delete cascade,
  question_id      uuid not null references public.questions(id) on delete restrict,
  answer_value     int not null check (answer_value between 0 and 4),
  normalized_value numeric,
  created_at       timestamptz not null default now()
);

create index if not exists answers_session_idx on public.assessment_answers(session_id);

-- =============================================================
-- 4. recommendations
-- =============================================================
create table if not exists public.recommendations (
  id          uuid primary key default uuid_generate_v4(),
  dimension   text not null,
  level       text not null check (level in ('bajo','moderado','prioritario')),
  title       text not null,
  description text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- =============================================================
-- 5. resources
-- =============================================================
create table if not exists public.resources (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  type        text not null,
  description text,
  audience    text,
  modality    text,
  location    text,
  schedule    text,
  contact     text,
  tags        jsonb,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- =============================================================
-- 6. gemini_outputs
-- =============================================================
create table if not exists public.gemini_outputs (
  id              uuid primary key default uuid_generate_v4(),
  session_id      uuid references public.assessment_sessions(id) on delete cascade,
  prompt_version  text,
  input_summary   jsonb,
  output          jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists gemini_session_idx on public.gemini_outputs(session_id);

-- =============================================================
-- Vista de distribución (uso interno)
-- =============================================================
create or replace view public.view_level_distribution as
  select
    general_level,
    count(*)::int as total,
    max(created_at) as updated_at
  from public.assessment_sessions
  where general_level is not null
  group by 1
  order by total desc;

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================
alter table public.questions            enable row level security;
alter table public.assessment_sessions  enable row level security;
alter table public.assessment_answers   enable row level security;
alter table public.recommendations      enable row level security;
alter table public.resources            enable row level security;
alter table public.gemini_outputs       enable row level security;

-- ---- Lectura pública: catálogos activos ----
drop policy if exists "anon read questions"      on public.questions;
create policy "anon read questions"
  on public.questions for select
  to anon, authenticated
  using (active = true);

drop policy if exists "anon read recommendations" on public.recommendations;
create policy "anon read recommendations"
  on public.recommendations for select
  to anon, authenticated
  using (active = true);

drop policy if exists "anon read resources"      on public.resources;
create policy "anon read resources"
  on public.resources for select
  to anon, authenticated
  using (active = true);

-- ---- Inserción anónima controlada (test público) ----
drop policy if exists "anon insert sessions" on public.assessment_sessions;
create policy "anon insert sessions"
  on public.assessment_sessions for insert
  to anon, authenticated
  with check (true);

drop policy if exists "anon insert answers" on public.assessment_answers;
create policy "anon insert answers"
  on public.assessment_answers for insert
  to anon, authenticated
  with check (true);

-- ---- BLOQUEAR lectura pública de respuestas y outputs Gemini ----
-- (no se crean políticas SELECT para anon en estas tablas; quedan inaccesibles)

-- ---- Para el panel admin (Fase 2 con autenticación):
-- crear políticas adicionales que permitan SELECT a usuarios autenticados con rol admin.
-- Ejemplo (ajustar a tu mecanismo de roles):
--
--   create policy "admin read sessions" on public.assessment_sessions
--     for select to authenticated
--     using (auth.jwt() ->> 'role' = 'admin');
