export interface TeamMember {
  login: string
  role: string
  status: 'maintainer' | 'advisor'
}

// Curate this list — add/adjust members and roles as needed.
export const teamMembers: TeamMember[] = [
  { login: 'segunadebayo', role: 'Creator of Chakra UI and Zag.js', status: 'maintainer' },
  { login: 'cschroeter', role: 'Core maintainer', status: 'maintainer' },
  { login: 'Adebesin-Cell', role: 'Maintainer', status: 'maintainer' },
  { login: 'estheragbaje', role: 'Developer Advocate', status: 'advisor' },
]
