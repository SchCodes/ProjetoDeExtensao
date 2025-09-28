export const queryKeys = {
  flags: ['flags'],
  settings: ['settings'],
  dogs: ['dogs'],
  dog: (id: string) => ['dogs', id],
  posts: ['posts'],
  partners: ['partners'],
  results: ['results'],
  leadsAdoption: ['leads', 'adoption'],
  leadsVolunteer: ['leads', 'volunteer']
} as const;
