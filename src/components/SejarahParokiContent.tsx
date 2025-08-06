'use client'

import React from 'react'
import Image from 'next/image'

import { getMediaURL } from '@/lib/getSejarahParokiData'
import type { SejarahParoki } from '@/payload-types'

interface SejarahParokiContentProps {
  data?: SejarahParoki | null
}

const SejarahParokiContent = ({ data }: SejarahParokiContentProps) => {
  const featuredImageUrl = data?.content?.featuredImage
    ? getMediaURL(data.content.featuredImage)
    : ''
  const timelineEvents = data?.timeline?.events || []

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Image */}
        {featuredImageUrl && (
          <div className="mb-12">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={featuredImageUrl}
                alt={data?.content?.imageCaption || 'Sejarah Paroki Santo Ambrosius'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
              />
            </div>
            {data?.content?.imageCaption && (
              <p className="text-sm text-gray-600 text-center mt-4 italic">
                {data.content.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Main Article Content */}
        {data?.content?.article ? (
          <div className="prose prose-lg prose-slate max-w-none">
            <div dangerouslySetInnerHTML={{ __html: data.content.article }} />
          </div>
        ) : (
          <div className="space-y-16">
            {/* Page Introduction */}
            {(data?.timeline?.introTitle || data?.timeline?.introDescription) && (
              <div className="text-center mb-20 pt-16 px-12">
                {data?.timeline?.introTitle && (
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-700 leading-tight m-0 tracking-tight mb-8">
                    {data.timeline.introTitle.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < data.timeline!.introTitle!.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h1>
                )}
                {data?.timeline?.introDescription && (
                  <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                    {data.timeline.introDescription}
                  </p>
                )}
              </div>
            )}

            {/* Timeline */}
            {timelineEvents.length > 0 && (
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-slate-700 rounded-full hidden md:block shadow-sm"></div>

                <div className="space-y-12 md:space-y-16">
                  {timelineEvents.map((event, index) => {
                    const isEven = index % 2 === 0

                    return (
                      <div
                        key={event.id || event.year || index}
                        className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                          isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                        }`}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-6 h-6 bg-white rounded-full border-4 border-slate-700 shadow-lg z-10 hidden md:flex items-center justify-center">
                          <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                        </div>

                        {/* Content */}
                        <div
                          className={`flex-1 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}
                        >
                          <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                            {/* Year badge */}
                            {event.year && (
                              <div className="absolute -top-3 right-4">
                                <span className="inline-flex items-center bg-slate-700 text-white px-4 py-2 rounded-xl text-lg font-medium shadow-lg">
                                  {event.year}
                                </span>
                              </div>
                            )}

                            {event.title && (
                              <h3 className="text-xl md:text-2xl font-medium text-slate-800 mb-4 text-left leading-tight pt-4">
                                {event.title}
                              </h3>
                            )}

                            {event.content && (
                              <div className="prose prose-slate max-w-none text-left leading-relaxed">
                                <div dangerouslySetInnerHTML={{ __html: event.content }} />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Spacer for desktop layout */}
                        <div className="hidden md:block flex-1"></div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Featured Quote */}
        {data?.content?.quote?.text && (
          <div className="mt-16 p-8 bg-gray-100 rounded-lg border-l-4 border-slate-700">
            <blockquote className="text-xl md:text-2xl font-light text-slate-700 italic leading-relaxed text-center">
              &ldquo;{data.content.quote.text}&rdquo;
            </blockquote>
            {data.content.quote.author && (
              <cite className="block mt-4 text-lg font-medium text-slate-800 not-italic text-center">
                — {data.content.quote.author}
              </cite>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default SejarahParokiContent
