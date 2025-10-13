import JoinCta from '@/components/join-cta'
import Image from 'next/image'

const faq = [
  {
    question: 'Do I have to join?',
    answer:
      'Life is full of choices, and this is one of them. Becoming a member is only necessary if you want to get the full Atomic experience. When you are signed in, we are able to record your progress and participation. That way we can make things flow and click. Just for you.',
  },
  {
    question: 'What if I do not want my personal information shared?',
    answer:
      'Atomic Ambitions has no interest in disclosing your personal information. What you choose to reveal is up to you. When you join, you get to pick an alias. That is how other members will know you. Also, feel free to use a pseudonym for your public profile. Unless you are a rock star and want a marketing boost.',
  },
  {
    question: 'Does it cost anything to join?',
    answer:
      'At the most basic "Explorer" level, membership is free. However, we would encourage you to consider a paid membership. In exchange for stepping up, we will provide an extra level of service, complete with bells and whistles.',
  },
  {
    question: 'What if I want to cancel my membership?',
    answer:
      "Simply cancel at any time. For paid memberships, we offer a 30-day money-back guarantee. (And we're not too strict about it. Not satisfied on day 31? Let us know, and get your refund.) After that, we will refund a pro-rated amount based on the number of months remaining.",
  },
  {
    question: 'Is this for real?',
    answer:
      'Yes, this is truly a platform that supports people who appreciate or want to learn about atomic energy and related science and engineering. This is for geeks, pragmatists, and futurists. This is for believers and skeptics alike. If you are into learning and the civilized exchange of ideas, this is the place for you. Enjoy!',
  },
]
export default function JoinPage() {
  return (
    <div>
      {/* Main Content */}
      <main className='flex-1'>
        {/* Hero Section */}
        <section id='join' className='py-16 bg-background'>
          <div className='container mx-auto px-6'>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div className='order-2 md:order-1'>
                <JoinCta title='Welcome!' />
              </div>
              <div className='order-1 md:order-2'>
                <h2
                  data-aa='page-heading'
                  className='text-4xl font-bold text-highlight mb-6'
                >
                  Join the Atomic Ambitions Community
                </h2>
                <div className='space-y-6 text-muted-foreground leading-relaxed'>
                  <p>Be a part of the action at Atomic Ambitions.</p>
                  <p>
                    By becoming a member at any level, you show your support for
                    a bright future with atomic energy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className='py-16 bg-muted/30'>
          <div className='container mx-auto px-6 space-y-12'>
            <div className='text-center mb-12 space-y-6'>
              <h2 className='text-foreground'>FAQ</h2>
              <p className='text-muted-foreground max-w-2xl mx-auto'>
                Are these questions asked frequently? Not as often as
                &quot;What&apos;s for dinner?&quot; or &quot;Are we there
                yet?&quot; Still, they may come to mind as you consider joining
                Atomic Ambitions.
              </p>
            </div>
            <div className='gap-6'>
              {faq.map((faq) => (
                <div key={faq.question}>
                  <h3 className='text-xl font-semibold text-primary mb-3'>
                    {faq.question}
                  </h3>
                  <p className='text-muted-foreground text-sm mb-6'>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Time */}
        <section className='py-16 bg-background'>
          <div className='container mx-auto px-6'>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div>
                <h2 className='text-3xl font-bold text-highlight mb-6'>
                  Why Join This Community?
                </h2>
                <div className='space-y-6'>
                  <p>
                    When you present a case for doing something, always lead
                    with the strongest argument. In the case of atomic energy,
                    it is all about efficiency. How the tiniest particles
                    unleash enormous amounts of energy.
                  </p>
                  <p>
                    In the case of joining Atomic Ambitions, it is all about
                    having a place to explore the science and engineering, as
                    well as the history and future, of atomic energy.
                  </p>
                  <p>
                    Many of the biggest challenges are emotional. Find balance
                    by hanging out with people who are calm and rational.
                  </p>
                </div>
              </div>
              <div>
                <Image
                  src='/flowing-river-home.jpg'
                  width={512}
                  height={288}
                  alt='Peaceful river scene'
                />
              </div>
            </div>
            <div className='my-12'>
              <a href='#join' className='btn btn-primary'>
                Okay, sign me up!
              </a>
            </div>
          </div>
        </section>

        {/* Appeal to Sense of Belonging */}
        <section className='py-16 bg-muted/30'>
          <div className='container mx-auto px-6'>
            <div className='max-w-4xl mx-auto text-center'>
              <h2 className='text-3xl font-bold text-highlight mb-6'>
                You Belong Here
              </h2>
              <div className='space-y-6 text-muted-foreground leading-relaxed'>
                <p>
                  If you are curious about atomic energy. If you want to
                  understand how this abundant source of power works. If you
                  want to discuss concerns about the side effects of using
                  atomic energy. If you are skeptical but open minded. You are
                  welcome here.
                </p>
                <p>
                  If you already understand the wonder of atomic energy. If you
                  want to share what you know with others. If you want to
                  discuss matters that are controversial or think creatively
                  about problems that still need to be solved. You are welcome
                  here.
                </p>
              </div>
              <div className='my-12'>
                <a href='#join' className='btn btn-primary'>
                  Ready to join?
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
