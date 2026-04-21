import { supabase } from '../client'

export const CREWMATE_TABLE = 'crewmates'

export const colorOptions = [
  { name: 'Coral', hex: '#ff6b6b', vibe: 'Bold enough to lead the first push.' },
  { name: 'Amber', hex: '#f7b267', vibe: 'Sharp and hard to miss in a crowded ship.' },
  { name: 'Mint', hex: '#52d1b2', vibe: 'Calm under pressure and good at support work.' },
  { name: 'Sky', hex: '#57b8ff', vibe: 'Clean, cool, and tuned for steady missions.' },
  { name: 'Indigo', hex: '#5f6fff', vibe: 'Measured and tactical when the crew gets tense.' },
  { name: 'Rose', hex: '#ff5c8a', vibe: 'Stylish, loud, and usually at the center of the action.' },
  { name: 'Lime', hex: '#9be564', vibe: 'Quick to adapt when the mission changes.' },
  { name: 'Ivory', hex: '#f2efe8', vibe: 'Minimal, sharp, and impossible to ignore.' },
]

export const speedOptions = [
  { value: 2, label: '2 mph', note: 'Steady' },
  { value: 4, label: '4 mph', note: 'Balanced' },
  { value: 6, label: '6 mph', note: 'Quick' },
  { value: 8, label: '8 mph', note: 'Rapid' },
  { value: 10, label: '10 mph', note: 'Turbo' },
]

export const defaultCrewmate = {
  name: '',
  speed: speedOptions[1].value,
  color: colorOptions[0].name,
}

const colorMap = Object.fromEntries(colorOptions.map((option) => [option.name, option]))

export const getColorMeta = (color) => colorMap[color] || colorOptions[0]

export const getSpeedMeta = (rawSpeed) => {
  const speed = Number(rawSpeed)

  if (speed >= 9) {
    return { tier: 'Turbo', label: `${speed} mph`, note: 'Built for fast exits and faster reactions.' }
  }

  if (speed >= 7) {
    return { tier: 'Rapid', label: `${speed} mph`, note: 'Moves fast without losing control.' }
  }

  if (speed >= 5) {
    return { tier: 'Quick', label: `${speed} mph`, note: 'Good all-around speed for ship tasks.' }
  }

  if (speed >= 3) {
    return { tier: 'Balanced', label: `${speed} mph`, note: 'Reliable when the crew needs consistency.' }
  }

  return { tier: 'Steady', label: `${speed} mph`, note: 'Slower, but harder to rattle.' }
}

export const formatDate = (timestamp) => {
  if (!timestamp) {
    return 'Unknown'
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

export const formatErrorMessage = (error) => {
  const message = error?.message || 'Something went wrong while talking to Supabase.'

  if (message.includes('relation') && message.includes(CREWMATE_TABLE)) {
    return 'Supabase is connected, but the `crewmates` table does not exist yet. Use the SQL in the README first.'
  }

  if (message.toLowerCase().includes('failed to fetch') || message.toLowerCase().includes('fetch')) {
    return 'The app could not reach Supabase. Check your internet connection and your credentials.'
  }

  return message
}

export const buildCrewmateInsight = (crewmate) => {
  const speedMeta = getSpeedMeta(crewmate.speed)
  const colorMeta = getColorMeta(crewmate.color)
  const speed = Number(crewmate.speed)

  let missionRole = 'Systems specialist'
  let dangerNote = 'Better at staying composed than sprinting through chaos.'

  if (speed >= 8) {
    missionRole = 'Rapid response scout'
    dangerNote = 'Fast enough to clear long hallways before the room goes cold.'
  } else if (speed >= 5) {
    missionRole = 'Field operator'
    dangerNote = 'Balanced speed keeps this crewmate useful in nearly every room.'
  }

  return {
    missionRole,
    dangerNote,
    colorReadout: colorMeta.vibe,
    speedReadout: speedMeta.note,
  }
}

export const fetchCrewmates = async () => {
  const { data, error } = await supabase
    .from(CREWMATE_TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  return { data: data || [], error }
}

export const fetchCrewmate = async (id) => {
  const { data, error } = await supabase
    .from(CREWMATE_TABLE)
    .select('*')
    .eq('id', id)
    .single()

  return { data, error }
}

export const createCrewmate = async (crewmate) => {
  const { data, error } = await supabase
    .from(CREWMATE_TABLE)
    .insert({
      name: crewmate.name.trim(),
      speed: Number(crewmate.speed),
      color: crewmate.color,
    })
    .select()
    .single()

  return { data, error }
}

export const updateCrewmate = async (id, crewmate) => {
  const { data, error } = await supabase
    .from(CREWMATE_TABLE)
    .update({
      name: crewmate.name.trim(),
      speed: Number(crewmate.speed),
      color: crewmate.color,
    })
    .eq('id', id)
    .select()
    .single()

  return { data, error }
}

export const deleteCrewmate = async (id) => {
  const { error } = await supabase
    .from(CREWMATE_TABLE)
    .delete()
    .eq('id', id)

  return { error }
}
