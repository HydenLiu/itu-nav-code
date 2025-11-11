'use client'

import { mainList, type IResource } from '@/lib/resourceData'
import { cn } from '@/lib/utils'
import { Tabs } from '@base-ui-components/react/tabs'
import { Boxes, Building2, Camera, FileText, Wrench } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const iconMap: Record<string, any> = {
  BankOutlined: Building2,
  ToolOutlined: Wrench,
  ClusterOutlined: Boxes,
  CameraOutlined: Camera,
  ProfileOutlined: FileText,
}

export default function MainLeft() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="w-full">
      <Tabs.Root value={selectedIndex} onValueChange={setSelectedIndex}>
        <Tabs.List className="mb-4 flex space-x-1 rounded-xl bg-white/10 p-1 backdrop-blur-md">
          {mainList.map((main, index) => {
            const IconComponent = iconMap[main.icon]
            return (
              <Tabs.Tab
                key={index}
                value={index}
                className={cn(
                  'w-full rounded-lg py-2.5 text-sm leading-5 font-medium transition-all',
                  'ring-white/60 ring-offset-2 focus:ring-2 focus:outline-none',
                  'data-selected:bg-white data-selected:text-black/70 data-selected:shadow',
                  'text-white/80 hover:bg-white/12 hover:text-white',
                )}
              >
                <div className="flex items-center justify-center space-x-2">
                  {IconComponent && <IconComponent size={16} />}
                  <span>{main.title}</span>
                </div>
              </Tabs.Tab>
            )
          })}
        </Tabs.List>
        {mainList.map((main, idx) => (
          <Tabs.Panel
            key={idx}
            value={idx}
            className={cn(
              'mt-2 rounded-xl bg-white/80 p-3 backdrop-blur-md',
              'ring-white/60 ring-offset-2 focus:ring-2 focus:outline-none',
            )}
          >
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {main.list.map((resource: IResource, i: number) => (
                <a
                  key={i}
                  href={resource.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center justify-center rounded-lg p-4 transition-all duration-200 hover:bg-white/50 hover:shadow-lg"
                  title={resource.presentation}
                >
                  <div className="relative mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-white/50">
                    {resource.icon ? (
                      <Image
                        src={require(
                          `@/assets/images/${main.key}/${resource.icon}`,
                        )}
                        alt={resource.name}
                        width={40}
                        height={40}
                        loading="lazy"
                        className="object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded bg-white/50" />
                    )}
                  </div>
                  <div className="group-hover:text-primary text-center text-sm font-medium text-gray-800 transition-colors">
                    {resource.name}
                  </div>
                  {resource.presentation && (
                    <div className="mt-1 line-clamp-2 text-center text-xs text-gray-500">
                      {resource.presentation}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    </div>
  )
}
