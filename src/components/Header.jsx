import React from 'react'

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-4xl font-bold mb-4 text-white">Timothy Masso</h1>
      <ul className="list-none space-y-2 text-white">
        <li className="font-semibold">info</li>
        <ul className="ml-4 space-y-1">
          <li>sonic architect and computer guy</li>
          <li>
            <a href="/_aboutme/aboutme/" className="text-green-400 hover:text-green-300 underline">
              about me (under construction)
            </a>
          </li>
          <li>timothy.masso@gmail.com</li>
          <li>
            <a href="https://github.com/timothymasso" className="text-green-400 hover:text-green-300 underline">
              gitHub
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/timmasso_/" className="text-green-400 hover:text-green-300 underline">
              instagram
            </a>
          </li>
          <li>
            <a href="https://www.cosmos.so/timothymasso" className="text-green-400 hover:text-green-300 underline">
              cosmos (where I put some photos and cool stuff)
            </a>
          </li>
          <li>this is a site of everything me, as of 12/15/2025</li>
        </ul>
      </ul>
    </header>
  )
}
