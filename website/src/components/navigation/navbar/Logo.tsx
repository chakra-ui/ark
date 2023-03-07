import type { SVGAttributes } from 'react'

export const Logo = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="63px"
    height="20px"
    viewBox="0 0 63 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'translateY(2px)' }}
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.07473 7.57695C9.21277 7.17294 9.35088 6.76875 9.48904 6.36433C9.64944 5.8968 9.80558 5.44041 9.96157 4.98444L9.97953 4.93194C10.0327 4.77661 10.0858 4.62127 10.1388 4.46593C10.3495 3.84944 10.5601 3.23296 10.7744 2.6177C10.7763 2.61225 10.7782 2.60648 10.7802 2.60048C10.8003 2.54059 10.8278 2.45874 10.8969 2.45874C10.9642 2.45874 10.9918 2.53319 11.0132 2.59071C11.016 2.59812 11.0186 2.60525 11.0212 2.6119C11.084 2.77175 11.1405 2.93408 11.197 3.09641C11.2174 3.15501 11.2378 3.2136 11.2585 3.27208C11.418 3.72322 11.5776 4.17435 11.7372 4.62548C12.2869 6.17917 12.8365 7.73287 13.3858 9.2867C13.511 9.64097 13.4621 9.70699 13.0802 9.707C12.8417 9.70701 12.6032 9.70701 12.3647 9.70701C11.3032 9.707 10.2418 9.70699 9.18038 9.70772C9.13956 9.70775 9.09874 9.71215 9.05372 9.717C9.03136 9.71941 9.00796 9.72193 8.98301 9.72408L12.6148 20L12.6531 19.9938V15.5735H21.8947C21.887 15.5488 21.8805 15.5271 21.8745 15.5073C21.8632 15.4702 21.8541 15.4401 21.8437 15.4104C21.5622 14.6035 21.2807 13.7967 20.9991 12.9898C19.5087 8.71848 18.0183 4.44713 16.5307 0.174793C16.4829 0.0375015 16.4169 -0.000179878 16.274 0C13.2227 0.0038526 10.1713 0.00374696 7.11986 0.00364132C6.5828 0.00362273 6.04573 0.00360413 5.50866 0.00360712L5.30127 0.00360612L0 15.716L0.215452 15.716C0.631264 15.716 1.04708 15.7159 1.46289 15.7158C2.99697 15.7153 4.53106 15.7149 6.06512 15.7204C6.24167 15.7211 6.31584 15.6699 6.3727 15.5023C7.26891 12.862 8.17046 10.2234 9.07473 7.57695ZM33.914 0C35.7783 0 37.5489 0.268031 38.8634 1.01851C40.2032 1.78342 41.0475 3.03904 41.0475 4.926C41.0475 6.11937 40.5583 7.1908 39.6868 7.93509C39.3349 8.23563 39.3611 8.9687 39.7035 9.27997C39.7574 9.32899 39.8092 9.38012 39.8587 9.43343C40.3694 9.98264 40.6094 10.7223 40.6094 11.6382V13.4035C40.6094 14.0283 40.614 14.5945 40.8783 15.1377C40.9775 15.3416 40.829 15.579 40.6023 15.579H35.2961C35.1816 15.579 35.0765 15.5156 35.023 15.4144C34.8005 14.9935 34.7109 14.3312 34.7109 13.4446V12.2746C34.7109 11.7898 34.6036 11.4616 34.3689 11.2452C34.1275 11.0226 33.6866 10.8578 32.8765 10.8578H29.7671C29.491 10.8578 29.2671 11.0817 29.2671 11.3578V15.079C29.2671 15.3551 29.0432 15.579 28.7671 15.579H23.8685C23.5924 15.579 23.3685 15.3551 23.3685 15.079V0.5C23.3685 0.223858 23.5924 0 23.8685 0H33.914ZM32.8304 6.91751C33.8079 6.91751 34.3605 6.74017 34.6671 6.49346C34.957 6.26016 35.0797 5.92041 35.0797 5.43917C35.0797 5.16287 35.0237 4.95713 34.9342 4.80069C34.8454 4.64532 34.7132 4.52021 34.5309 4.42032C34.1532 4.2134 33.5802 4.12503 32.8304 4.12503H29.7671C29.491 4.12503 29.2671 4.34889 29.2671 4.62503V6.41751C29.2671 6.69365 29.491 6.91751 29.7671 6.91751H32.8304ZM55.0708 0.139371C55.1639 0.049942 55.288 0 55.4171 0H61.6326C62.0938 0 62.3091 0.571188 61.9627 0.875596L55.9164 6.18854C55.7103 6.36969 55.6886 6.68315 55.868 6.89088L62.6548 14.7522C62.9345 15.0762 62.7043 15.579 62.2763 15.579H56.1211C55.9729 15.579 55.8323 15.5132 55.7373 15.3995L51.6631 10.5209C51.4793 10.3007 51.1483 10.2801 50.9385 10.4756L49.3549 11.9515C49.2534 12.0461 49.1958 12.1785 49.1958 12.3173V15.079C49.1958 15.3551 48.9719 15.579 48.6958 15.579H43.7972C43.5211 15.579 43.2972 15.3551 43.2972 15.079V0.5C43.2972 0.223858 43.5211 0 43.7972 0H48.6958C48.9719 0 49.1958 0.223858 49.1958 0.5V4.608C49.1958 5.0486 49.7243 5.27382 50.0421 4.96863L55.0708 0.139371Z"
      fill="#EB5E41"
    />
  </svg>
)
