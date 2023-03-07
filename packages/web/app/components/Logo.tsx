import * as React from 'react'

export const Logo: React.FC<{ size?: number }> = (props) => (
  <svg
    style={{ marginRight: 30 }}
    width={props.size ?? 70}
    height={props.size ?? 70}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_422)">
      <rect width="200" height="200" fill="#F5EDCE" />
      <rect x="13" y="51" width="43" height="36" fill="#58287F" />
      <rect
        x="187"
        y="148"
        width="43"
        height="54"
        transform="rotate(180 187 148)"
        fill="#58287F"
      />
      <rect x="63" y="51" width="93" height="36" fill="#58287F" />
      <rect
        x="137"
        y="148"
        width="93"
        height="54"
        transform="rotate(180 137 148)"
        fill="#58287F"
      />
      <rect x="163" y="51" width="24" height="36" fill="#58287F" />
      <rect
        x="37"
        y="148"
        width="24"
        height="54"
        transform="rotate(180 37 148)"
        fill="#58287F"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_422">
        <rect width="200" height="200" rx="10" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
