export interface TeamMember {
  login: string
  role: string
  status: 'maintainer' | 'advisor'
  name?: string
}

export const teamMembers: TeamMember[] = [
  { login: 'segunadebayo', role: 'Creator of Chakra UI and Zag.js', status: 'maintainer' },
  { login: 'cschroeter', role: 'Core maintainer', status: 'maintainer' },
  { login: 'Adebesin-Cell', role: 'Maintainer', status: 'maintainer', name: 'Adebesin Tolulope' },
  { login: 'estheragbaje', role: 'Developer Marketing', status: 'maintainer' },
  { login: 'anubra266', role: 'Advisor', status: 'advisor' },
]
