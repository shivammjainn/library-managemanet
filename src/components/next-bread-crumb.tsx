'use client'
import React, { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { TBreadCrumbProps } from './types/types'



const NextBreadcrumb = ({ homeElement, separator, containerClasses, listClasses, activeClasses }: TBreadCrumbProps) => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)
    const isHomePage = paths === '/'
    const homeClasses = isHomePage ? `${listClasses} ${activeClasses}` : listClasses

    return (
        <div>
            <ul className={containerClasses}>
                <li className={homeClasses}><Link href={'/'}>{homeElement}</Link></li>
                {pathNames.length > 0 && separator}
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                        let itemLink = link
                        return (
                            <div key={index}>
                                <li className={itemClasses} >
                                    <Link href={href}>{itemLink}</Link>
                                    {pathNames.length !== index + 1 && separator}
                                </li>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default NextBreadcrumb