import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useRef, useState } from 'react'

export default function Home() {
  const [link, setLink] = useState<string>('')
  const [description, setDescription] = useState<string>('A simple link shortener')
  const [buttonText, setButtonText] = useState<string>('Shorten')
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const inputReference = useRef(null);

  function shortenLink() {
    setButtonText('Shortening...')
    setIsButtonDisabled(true)
    if (link.length > 2048) {
      return setDescription('Link is too long')
    }

    if (!new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g).test(link)) {
      return setDescription("Invalid link")
    }

    if (link.includes('next-link-shortener-psi.vercel.app')) {
      return setDescription('You can\'t shorten a shortened link')
    }

    fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link
      })
    }).then(res => res.json()).then(data => {
      setLink(`https://next-link-shortener-psi.vercel.app/api/redirect/${data.name}`)
      setDescription('Link shortened successfully, will be deleted after 7 days');
      (inputReference?.current as any).select()
      setIsButtonDisabled(false)
      setButtonText('Shorten')
    }).catch(err => {
      setDescription('An error occured, please try again')
      setIsButtonDisabled(false)
      setButtonText('Shorten')
    })
  }

  return (
    <>
      <Head>
        <title>Next Link Shortener</title>
        <meta name="description" content="Basic link shortener made with NextJS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={
        styles.main
      }>
        <span>
          <p className={styles.title}>Link Shortener</p>
          <p className={styles.description}>{description}</p>
        </span>
        <input className={styles.input} value={link} onChange={(e) => {
          setLink(e.target.value)
        }} ref={inputReference} type="text" placeholder="Paste your link here" />
        <button className={styles.button} disabled={isButtonDisabled} onClick={() => shortenLink()}>{buttonText}</button>
      </main>
    </>
  )
}
