import {SVGProps} from 'react'

export function Common(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5.08 5.08" {...props}>
      <path
        fill="currentColor"
        d="M5.08,2.54c0,.34-.06.66-.19.97s-.31.58-.55.83c-.24.24-.51.42-.82.55-.31.13-.63.19-.97.19s-.67-.06-.98-.19c-.31-.13-.58-.31-.82-.55-.24-.24-.43-.52-.55-.83-.13-.31-.19-.63-.19-.97s.06-.66.19-.97c.13-.31.31-.58.55-.83.24-.24.51-.42.82-.55.31-.13.63-.19.97-.19s.66.06.97.19c.31.13.58.31.83.55.24.24.43.52.55.83.13.31.19.63.19.97"
      />
    </svg>
  )
}
export default Common
