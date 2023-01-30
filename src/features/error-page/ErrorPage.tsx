import { useRouteError } from "react-router-dom";

export default function ErrorPage(props: { errorCode?: number, message?: string }) {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>There was an error</p>
      <p>
        {/*// @ts-ignore*/ }
        <i>{ props?.errorCode } | { !!error ? error?.statusText || error?.message : "" }{ props?.message }</i>
      </p>
    </div>
  );
}
