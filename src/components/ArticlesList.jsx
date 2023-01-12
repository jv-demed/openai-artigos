import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getInfo } from '../infra/getInfo';

const ArticlesListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
    padding-bottom: 30px;
    width: 100%;
    .title{
        display: flex;
        justify-content: space-between;
    }
    td{
        border: 1px solid black;
    }
`

export function ArticlesList(){

    const [articles, setArticles] = useState([]);
    const [pmid, setPmid] = useState('');

    useEffect(() => {
        getInfo({
            filter: {
                type: 'article',
            }
        }).then(res => setArticles(res));
    }, []);

    return(
        <ArticlesListStyled className='container'>
            <div className="title">
                <h2>Resumos: </h2>
                <input 
                    type="text" 
                    placeholder='PMID' 
                    onChange={(e) => setPmid(e.target.value)} 
                />
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>PMID</th>
                        <th>DOI</th>
                        <th>Gene</th>
                        <th>Polimorf.</th>
                        <th>P</th>
                        <th>Pop.</th>
                        <th>Quant</th>
                        <th>Conc.</th>
                    </tr>
                    {articles.map(art => {
                        if(art.pmid.toString().includes(pmid)){
                            return(
                                <tr key={art.id}>
                                    <td>{art.pmid}</td>
                                    <td>{art.doi}</td>
                                    <td>{art.gene}</td>
                                    <td>{art.polymorphism}</td>
                                    <td>{art.significance}</td>
                                    <td>{art.population}</td>
                                    <td>{art.sample}</td>
                                    <td>{art.conclusion}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </ArticlesListStyled>
    )
}