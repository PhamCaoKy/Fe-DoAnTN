import { Typography } from '@material-tailwind/react'
const LINKS = [
  {
    title: 'Facebook',
    items: [{ name: 'Kỳ Phạm', link: 'https://www.facebook.com/cao.phamky' }]
  },
  {
    title: 'Github',
    items: [{ name: 'PhamCaoKy', link: 'https://github.com/PhamCaoKy' }]
  },
  {
    title: 'Gmail',
    items: [{ name: 'phamcaoky2001@gmail.com', link: '/' }]
  }
]

export default function Footer() {
  return (
    <footer className='relative mt-12 w-full'>
      <div className='mx-auto w-full max-w-7xl px-8'>
        <div className='grid grid-cols-1 justify-between gap-4 md:grid-cols-2'>
          <Typography variant='h5' color='blue' className='mb-6'>
            Website học tiếng việt cho trẻ <em></em>
          </Typography>
          <div className='grid grid-cols-3 justify-between gap-4'>
            {LINKS.map(({ title, items }, index) => (
              <ul key={index}>
                <Typography variant='small' color='blue-gray' className='mb-3 font-medium opacity-40'>
                  {title}
                </Typography>
                {items.map((links: any,index) => (
                  <li key={index}>
                    <Typography
                      as='a'
                      href={links.link}
                      color='gray'
                      className='py-1.5 font-normal transition-colors hover:text-blue-gray-900'
                    >
                      {links.name}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
