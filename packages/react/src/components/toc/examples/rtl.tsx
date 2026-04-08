import { Toc } from '@ark-ui/react/toc'
import styles from 'styles/toc.module.css'

const items = [
  { value: 'rtl1', depth: 2 },
  { value: 'rtl2', depth: 2 },
  { value: 'rtl3', depth: 2 },
]

export const Rtl = () => (
  <Toc.Root className={styles.Root} items={items} dir="rtl">
    <Toc.Content className={styles.Content}>
      <h2 id="rtl1">مقدمة</h2>
      <p>هذا هو القسم الأول.</p>
      <h2 id="rtl2">الاستخدام</h2>
      <p>هذا هو القسم الثاني.</p>
      <h2 id="rtl3">الميزات</h2>
      <p>هذا هو القسم الثالث.</p>
    </Toc.Content>
    <Toc.Nav className={styles.Nav}>
      <Toc.Title className={styles.Title}>في هذه الصفحة</Toc.Title>
      <Toc.List className={styles.List}>
        {items.map((item) => (
          <Toc.Item key={item.value} item={item} className={styles.Item}>
            <Toc.Link className={styles.Link}>
              {item.value === 'rtl1' ? 'مقدمة' : item.value === 'rtl2' ? 'الاستخدام' : 'الميزات'}
            </Toc.Link>
          </Toc.Item>
        ))}
      </Toc.List>
    </Toc.Nav>
  </Toc.Root>
)
