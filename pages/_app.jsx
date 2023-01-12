import Head from 'next/head';
import '../src/styles/global.css';

export default function App({ Component, pageProps }){
    return(
        <>
            <Head>
                <title>Openai - Artigos</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}