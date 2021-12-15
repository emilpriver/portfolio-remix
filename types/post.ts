import { ElementNode } from '@graphcms/rich-text-types';

export type Post = {
  id: string
  title: string
  slug: string
  createdAt: string
  date: string
  content: {
    html: string
    text: string
    json: {
      children: ElementNode[]
    }
    references: any
  }
  seo: {
    description: string
    image: {
      url: string
    }
    title: string
  }
  coverImage: {
    url: string
  }
}