import styled from 'styled-components';
import { useState } from 'react';
import { ArticlesInput } from '../src/components/ArticlesInput';
import { ArticlesList } from '../src/components/ArticlesList';

const HomeStyled = styled.main`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
`

export default function Home(){
    return(
        <HomeStyled>
            <ArticlesInput />
            <ArticlesList />
        </HomeStyled>
    )
}