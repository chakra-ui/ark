import { useAsyncList } from '@ark-ui/react/collection'
import { LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import field from 'styles/field.module.css'
import styles from 'styles/async-list.module.css'

const LIMIT = 5

interface User {
  id: number
  name: string
  email: string
  department: string
  role: string
}

export const Dependencies = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<string>('')

  const list = useAsyncList<User>({
    initialItems: mockUsers.slice(0, LIMIT),
    dependencies: [selectedDepartment, selectedRole],
    async load({ filterText }) {
      await delay(400)

      let items = mockUsers

      if (selectedDepartment) {
        items = items.filter((user) => user.department === selectedDepartment)
      }

      if (selectedRole) {
        items = items.filter((user) => user.role === selectedRole)
      }

      if (filterText) {
        items = items.filter(
          (user) =>
            user.name.toLowerCase().includes(filterText.toLowerCase()) ||
            user.email.toLowerCase().includes(filterText.toLowerCase()),
        )
      }

      return { items: items.slice(0, LIMIT) }
    },
  })

  return (
    <div className={styles.Root}>
      <div className={styles.Header}>
        <select
          className={field.Select}
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select className={field.Select} value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <input
          className={field.Input}
          type="text"
          placeholder="Search..."
          value={list.filterText}
          onChange={(e) => list.setFilterText(e.target.value)}
        />

        {list.loading && (
          <span className={styles.Loading}>
            <LoaderIcon className={styles.Spinner} /> Loading
          </span>
        )}
      </div>

      {list.error && <div className={styles.Error}>Error: {list.error.message}</div>}

      <div className={styles.Status}>Found {list.items.length} users</div>

      <div className={styles.ItemGroup}>
        {list.items.map((user) => (
          <div key={user.id} className={styles.Item}>
            <div className={styles.ItemContent}>
              <div className={styles.ItemTitle}>{user.name}</div>
              <div className={styles.ItemDescription}>{user.email}</div>
              <div className={styles.ItemMeta}>
                {user.department} • {user.role}
              </div>
            </div>
          </div>
        ))}
      </div>

      {list.items.length === 0 && !list.loading && (
        <div className={styles.Empty}>No users found with current filters</div>
      )}
    </div>
  )
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const departments = ['Engineering', 'Marketing', 'Sales', 'Support']

const roles = [
  'Senior Developer',
  'Marketing Manager',
  'Frontend Developer',
  'Sales Representative',
  'DevOps Engineer',
  'Customer Success',
  'Content Creator',
  'Backend Developer',
  'Account Manager',
  'Technical Support',
  'Brand Manager',
  'Full Stack Developer',
  'Sales Director',
  'Support Manager',
  'UI Designer',
  'Digital Marketer',
  'Mobile Developer',
  'Business Development',
  'Documentation Specialist',
  'Social Media Manager',
]

const mockUsers: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', department: 'Engineering', role: 'Senior Developer' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', department: 'Marketing', role: 'Marketing Manager' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', department: 'Engineering', role: 'Frontend Developer' },
  { id: 4, name: 'David Wilson', email: 'david@example.com', department: 'Sales', role: 'Sales Representative' },
  { id: 5, name: 'Eva Brown', email: 'eva@example.com', department: 'Engineering', role: 'DevOps Engineer' },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', department: 'Support', role: 'Customer Success' },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', department: 'Marketing', role: 'Content Creator' },
  { id: 8, name: 'Henry Taylor', email: 'henry@example.com', department: 'Engineering', role: 'Backend Developer' },
  { id: 9, name: 'Ivy Anderson', email: 'ivy@example.com', department: 'Sales', role: 'Account Manager' },
  { id: 10, name: 'Jack Thompson', email: 'jack@example.com', department: 'Support', role: 'Technical Support' },
  { id: 11, name: 'Kate Martinez', email: 'kate@example.com', department: 'Marketing', role: 'Brand Manager' },
  { id: 12, name: 'Liam Garcia', email: 'liam@example.com', department: 'Engineering', role: 'Full Stack Developer' },
  { id: 13, name: 'Mia Rodriguez', email: 'mia@example.com', department: 'Sales', role: 'Sales Director' },
  { id: 14, name: 'Noah Lopez', email: 'noah@example.com', department: 'Support', role: 'Support Manager' },
  { id: 15, name: 'Olivia White', email: 'olivia@example.com', department: 'Engineering', role: 'UI Designer' },
  { id: 16, name: 'Paul Harris', email: 'paul@example.com', department: 'Marketing', role: 'Digital Marketer' },
  { id: 17, name: 'Quinn Clark', email: 'quinn@example.com', department: 'Engineering', role: 'Mobile Developer' },
  { id: 18, name: 'Ruby Lewis', email: 'ruby@example.com', department: 'Sales', role: 'Business Development' },
  { id: 19, name: 'Sam Young', email: 'sam@example.com', department: 'Support', role: 'Documentation Specialist' },
  { id: 20, name: 'Tina Walker', email: 'tina@example.com', department: 'Marketing', role: 'Social Media Manager' },
]
