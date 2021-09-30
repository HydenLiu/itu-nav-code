declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module '*.svg';
/*
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
*/
declare module 'classnames';

// api接口域名
declare const API_HOST: string;
