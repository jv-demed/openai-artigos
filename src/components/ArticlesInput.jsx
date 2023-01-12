import styled from 'styled-components';
import { useState } from 'react';
import { postCompletion } from '../data/postCompletion';

const ArticlesInputStyled = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    width: 100%;
    .title{
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
    textarea{
        height: 150px;
        resize: none;
    }
`

export function ArticlesInput(){

    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return(
        <ArticlesInputStyled className='container'
            onSubmit={async e => {
                e.preventDefault();
                setIsLoading(true);
                const response = await fetch("/api/openai", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ articles: text.split('",\n') }),
                });
                const data = await response.json();
                await postCompletion(data.result);
                setIsLoading(false)
            }}
        >
            <div className="title">
                <h2>Artigos: </h2>
                <span>Exemplo: "Artigo1",\n "Artigo2",\n "Artigo3"</span>
            </div>
            <textarea value={text} onChange={(e) => {
                setText(e.target.value);
            }} />
            {!isLoading ?
                <button>Fazer Busca</button>
                :
                <span>loading</span>
            }
        </ArticlesInputStyled>
    )
}