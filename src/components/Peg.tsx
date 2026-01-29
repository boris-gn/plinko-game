import { memo } from "react";

interface PegProps {
  x: number;
  y: number;
  active?: boolean;
}

export const Peg = memo(({ x, y, active = true }: PegProps) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        width: "6px",
        height: "12px",
        zIndex: 10,
        opacity: active ? 1 : 0.4,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="16"
        viewBox="0 0 10 16"
        fill="none"
      >
        <g filter="url(#filter0_f_10544_182323)">
          <path
            d="M3.7804 8.10394V8.62525C4.09448 9.40721 4.82733 9.14656 5.03671 8.62525V6.54002V4.97611C5.03671 3.93349 5.14413 3.15272 5.14413 3.15272C5.14413 2.61043 5.84942 1.75194 4.3259 2.06797C3.06958 2.32857 3.7804 3.3253 3.7804 3.93349V5.49741V8.10394Z"
            fill="url(#paint0_linear_10544_182323)"
          />
        </g>
        <g filter="url(#filter1_f_10544_182323)">
          <ellipse
            cx="4.59961"
            cy="11.0172"
            rx="3"
            ry="2.98301"
            fill="url(#paint1_radial_10544_182323)"
          />
        </g>
        <g filter="url(#filter2_f_10544_182323)">
          <ellipse
            cx="4.59961"
            cy="11.0172"
            rx="3"
            ry="2.98301"
            fill="url(#paint2_radial_10544_182323)"
          />
        </g>
        <g filter="url(#filter3_f_10544_182323)">
          <ellipse
            cx="4.59961"
            cy="11.0172"
            rx="3"
            ry="2.98301"
            fill="url(#paint3_radial_10544_182323)"
          />
        </g>
        <g filter="url(#filter4_f_10544_182323)">
          <ellipse
            cx="4.59961"
            cy="11.0172"
            rx="3"
            ry="2.98301"
            fill="url(#paint4_radial_10544_182323)"
          />
        </g>
        <g filter="url(#filter5_f_10544_182323)">
          <ellipse
            cx="4.59961"
            cy="11.0172"
            rx="3"
            ry="2.98301"
            fill="url(#paint5_radial_10544_182323)"
          />
        </g>
        <ellipse
          cx="4.59896"
          cy="11.0174"
          rx="2.33333"
          ry="2.32012"
          fill="url(#paint6_radial_10544_182323)"
        />
        <ellipse
          cx="4.59896"
          cy="11.0174"
          rx="2.33333"
          ry="2.32012"
          fill="url(#paint7_radial_10544_182323)"
        />
        <ellipse
          cx="4.59896"
          cy="11.0174"
          rx="2.33333"
          ry="2.32012"
          fill="url(#paint8_linear_10544_182323)"
        />
        <ellipse
          cx="4.59896"
          cy="10.3543"
          rx="2.33333"
          ry="2.32012"
          fill="url(#paint9_radial_10544_182323)"
        />
        <defs>
          <filter
            id="filter0_f_10544_182323"
            x="1.58008"
            y="0"
            width="5.72656"
            height="11.1187"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0"
              result="effect1_foregroundBlur_10544_182323"
            />
          </filter>
          <filter
            id="filter1_f_10544_182323"
            x="0.0996094"
            y="6.53418"
            width="9"
            height="8.96582"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.75"
              result="effect1_foregroundBlur_10544_182323"
            />
          </filter>
          <filter
            id="filter2_f_10544_182323"
            x="0.0996094"
            y="6.53418"
            width="9"
            height="8.96582"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.75"
              result="effect1_foregroundBlur_10544_182323"
            />
          </filter>
          <filter
            id="filter3_f_10544_182323"
            x="0.0996094"
            y="6.53418"
            width="9"
            height="8.96582"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.75"
              result="effect1_foregroundBlur_10544_182323"
            />
          </filter>
          <filter
            id="filter4_f_10544_182323"
            x="-0.000390649"
            y="6.43418"
            width="9.2"
            height="9.16582"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.8"
              result="effect1_foregroundBlur_10544_182323"
            />
          </filter>
          <filter
            id="filter5_f_10544_182323"
            x="-0.000390649"
            y="6.43418"
            width="9.2"
            height="9.16582"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="0.8"
              result="effect1_foregroundBlur_10544_182323"
            />
          </filter>
          <linearGradient
            id="paint0_linear_10544_182323"
            x1="5.14475"
            y1="2.10891"
            x2="5.14475"
            y2="9.11875"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.104877" stop-color="#B19D00" stop-opacity="0.6" />
            <stop offset="0.84183" stop-color="white" />
          </linearGradient>
          <radialGradient
            id="paint1_radial_10544_182323"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.59961 7.37129) rotate(90) scale(5.30312 5.33333)"
          >
            <stop stop-color="#00FF3C" />
            <stop offset="1" stop-color="#7D2964" stop-opacity="0.1" />
          </radialGradient>
          <radialGradient
            id="paint2_radial_10544_182323"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.59961 7.37129) rotate(90) scale(5.30312 5.33333)"
          >
            <stop stop-color="#00FF3C" />
            <stop offset="1" stop-color="#7D2964" stop-opacity="0.1" />
          </radialGradient>
          <radialGradient
            id="paint3_radial_10544_182323"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.59961 7.37129) rotate(90) scale(5.30312 5.33333)"
          >
            <stop stop-color="#00FF3C" />
            <stop offset="1" stop-color="#7D2964" stop-opacity="0.1" />
          </radialGradient>
          <radialGradient
            id="paint4_radial_10544_182323"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.26628 14.3316) rotate(-90) scale(3.97734 4)"
          >
            <stop stop-color="#755F00" />
            <stop offset="1" stop-color="#757D29" stop-opacity="0.1" />
          </radialGradient>
          <radialGradient
            id="paint5_radial_10544_182323"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.26628 14.3316) rotate(-90) scale(3.97734 4)"
          >
            <stop stop-color="#755F00" />
            <stop offset="1" stop-color="#757D29" stop-opacity="0.1" />
          </radialGradient>
          <radialGradient
            id="paint6_radial_10544_182323"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.59896 11.0174) rotate(90) scale(2.32012 2.33333)"
          >
            <stop stop-color="#D9D9D9" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <radialGradient
            id="paint7_radial_10544_182323"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.59896 11.0174) rotate(90) scale(2.32012 2.33333)"
          >
            <stop stop-color="#D9D9D9" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <linearGradient
            id="paint8_linear_10544_182323"
            x1="4.59896"
            y1="7.37148"
            x2="4.59896"
            y2="12.3432"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#D9D9D9" />
            <stop offset="0.685084" stop-color="white" stop-opacity="0" />
          </linearGradient>
          <radialGradient
            id="paint9_radial_10544_182323"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(4.59896 10.3543) rotate(90) scale(3.6459 3.66667)"
          >
            <stop stop-color="white" />
            <stop offset="0.597812" stop-color="white" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});

Peg.displayName = "Peg";
