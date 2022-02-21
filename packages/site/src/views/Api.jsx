import { chdir } from 'process'
import React from 'react'
import styled from 'styled-components'
import apiDescription from '../api.json'

console.log({apiDescription})

const Wrapper = styled.div`
  max-width: 650px;
  margin: 0 auto;
`;

export const Api = () => {
  return <Wrapper>
    {
      apiDescription.children.map((node) => (
        <div key={node.name}>
          <b>{node.name}</b>
          {
            node.children && 
            <table>
                <thead>
                  <th>name</th>
                  <th>type</th>
                  <th>description</th>
                </thead>
                {
                  node.children?.map?.(child => {
                    return (
                      <tr>
                        <td>{child.name}</td>
                        <td>{child?.type?.name}</td>
                        <td>{child?.comment?.shortText}</td>
                      </tr>
                    )
                  })
                }
            </table>
          }
        </div>
      ))
    }
  </Wrapper>
}
