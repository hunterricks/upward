import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-12-11',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getHeroSlides() {
  try {
    // First, let's get ALL documents to see what's in the dataset
    console.log('Fetching all documents...')
    const allDocs = await client.fetch('*[]')
    console.log('All documents in dataset:', allDocs)

    // Now let's check specifically for heroSlide documents
    console.log('Fetching hero slides...')
    const slides = await client.fetch('*[_type == "heroSlide"]')
    console.log('Hero slides:', slides)

    return slides
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    })
    throw error
  }
}
