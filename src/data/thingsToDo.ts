import type { ImageName } from './imageMeta'

export type TodoCategory = 'local-food' | 'experiences'

export interface TodoItem {
  id: string
  category: TodoCategory
  title: string
  summary: string
  /** Short factual tag, e.g. when it is best enjoyed. */
  tag: string
  /** Photo for experiences; local-food cards use an icon tile instead. */
  image?: ImageName
  focus?: string
  icon?: 'food' | 'drink' | 'sweet' | 'paan'
  /** Where the card leads. */
  to: string
  cta: string
}

export const todoTabs = [
  { slug: '', label: 'All things to do', to: '/things-to-do' },
  { slug: 'local-food', label: 'Local food', to: '/things-to-do/local-food' },
  { slug: 'experiences', label: 'Experiences', to: '/things-to-do/experiences' },
] as const

export const todoItems: readonly TodoItem[] = [
  // Experiences
  { id: 'sunrise-boat', category: 'experiences', title: 'Sunrise boat ride', summary: 'Watch the ghats wake up from the river — soft light, morning prayers and quiet water.', tag: 'Early morning', image: 'hero-ghats-sunrise-boats', focus: '50% 55%', to: '/boat/motor-boat', cta: 'See boat rides' },
  { id: 'ganga-aarti', category: 'experiences', title: 'Evening Ganga Aarti', summary: 'Lamps, conch shells and chanting on the riverbank. Watch from the steps or from a boat.', tag: 'After sunset', image: 'ganga-aarti-evening', focus: '50% 40%', to: '/boat/motor-boat', cta: 'Plan with a boat' },
  { id: 'dev-deepawali', category: 'experiences', title: 'Dev Deepawali', summary: 'The festival of lights on Kartik Purnima, when the ghats are lined with lamps.', tag: 'Kartik Purnima', image: 'real-boat-m2-night', focus: '50% 45%', to: '/boat/dev-diwali-booking', cta: 'Dev Diwali booking' },
  { id: 'heritage-walk', category: 'experiences', title: 'Old-city heritage walk', summary: 'Wander the narrow galis between temples, sweet shops and weavers’ homes.', tag: 'Morning or evening', image: 'old-city-lane', focus: '50% 55%', to: '/packages', cta: 'See packages' },
  { id: 'temple-visit', category: 'experiences', title: 'Kashi Vishwanath visit', summary: 'One of Kashi’s most revered Shiva temples. Rules and timings are set by the temple authorities.', tag: 'Plan ahead', image: 'kvt-spire-gate', focus: '50% 24%', to: '/packages/varanasi-2n3d', cta: 'View a package' },
  { id: 'sarnath', category: 'experiences', title: 'Sarnath day trip', summary: 'The Buddhist site where the Buddha is traditionally said to have given his first sermon.', tag: 'Half day', image: 'sarnath-dhamek-monks', focus: '50% 55%', to: '/cab/swift-dzire', cta: 'Arrange a cab' },
  { id: 'ramnagar', category: 'experiences', title: 'Ramnagar Fort', summary: 'An 18th-century riverside fort with a museum, across the Ganga from the old city.', tag: 'Half day', image: 'ramnagar-fort', focus: '35% 50%', to: '/packages/varanasi-3n4d', cta: 'View a package' },
  { id: 'pilgrimage', category: 'experiences', title: 'Kashi–Prayagraj–Ayodhya yatra', summary: 'A multi-city pilgrimage with road transfers between the three holy cities.', tag: 'Multi-day', image: 'ayodhya-ram-mandir', focus: '50% 40%', to: '/packages/kashi-prayagraj-ayodhya', cta: 'View the yatra' },
  // Local food
  { id: 'kachori-sabzi', category: 'local-food', title: 'Kachori–sabzi breakfast', summary: 'Crisp kachori with spiced potato curry and jalebi — the classic Banarasi breakfast.', tag: 'Breakfast', icon: 'food', to: '/contact-us', cta: 'Ask for food stops' },
  { id: 'banarasi-lassi', category: 'local-food', title: 'Banarasi lassi', summary: 'Thick, chilled curd lassi served in a kulhad, often topped with rabri or malai.', tag: 'Anytime', icon: 'drink', to: '/contact-us', cta: 'Ask for food stops' },
  { id: 'tamatar-chaat', category: 'local-food', title: 'Tamatar chaat', summary: 'A tangy, spiced tomato chaat that Varanasi is known for.', tag: 'Evening', icon: 'food', to: '/contact-us', cta: 'Ask for food stops' },
  { id: 'malaiyo', category: 'local-food', title: 'Malaiyo', summary: 'A light, saffron-scented milk foam sold on winter mornings.', tag: 'Winter mornings', icon: 'sweet', to: '/contact-us', cta: 'Ask for food stops' },
  { id: 'banarasi-paan', category: 'local-food', title: 'Banarasi paan', summary: 'Betel-leaf paan prepared fresh, a traditional end to a meal.', tag: 'After meals', icon: 'paan', to: '/contact-us', cta: 'Ask for food stops' },
  { id: 'thandai', category: 'local-food', title: 'Thandai', summary: 'A chilled, spiced milk drink with nuts and saffron, popular around festivals.', tag: 'Festivals', icon: 'drink', to: '/contact-us', cta: 'Ask for food stops' },
  { id: 'chai-kulhad', category: 'local-food', title: 'Chai in a kulhad', summary: 'Strong ghat-side tea in an earthen cup — best with a river view.', tag: 'Morning & evening', icon: 'drink', to: '/contact-us', cta: 'Ask for food stops' },
  { id: 'sweets', category: 'local-food', title: 'Banarasi sweets', summary: 'Rabri, peda, ras malai and seasonal mithai from the old-city sweet shops.', tag: 'Gifts & dessert', icon: 'sweet', to: '/contact-us', cta: 'Ask for food stops' },
]

export const todoFaqs = [
  { id: 'best', question: 'What are the best things to do in Varanasi?', answer: 'A sunrise boat ride, the evening Ganga Aarti, an old-city walk, temple visits and a half-day at Sarnath are the classics. Add Dev Deepawali if you travel in November.' },
  { id: 'food', question: 'What should I eat in Varanasi?', answer: 'Try kachori-sabzi for breakfast, Banarasi lassi, tamatar chaat and malaiyo in winter. Tell us your food preferences and we will suggest places that suit you.' },
  { id: 'time', question: 'How many days do I need?', answer: 'Two to three days cover the main sights comfortably. Allow more if you want slower mornings, rituals or trips to Sarnath, Prayagraj or Ayodhya.' },
  { id: 'guide', question: 'Can you arrange a guide?', answer: 'Yes — ask for a guided heritage walk or temple visit when you enquire, and tell us your preferred language.' },
] as const
