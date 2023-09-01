import { render } from '@testing-library/vue'
import { Avatar, AvatarFallback, AvatarImage } from './'

describe('Avatar', () => {
  it('should render', async () => {
    render(
      <Avatar>
        <AvatarFallback>PA</AvatarFallback>
        <AvatarImage src="https://i.pravatar.cc/3000" alt="avatar" />
      </Avatar>,
    )
  })
})
