import React from 'react'
import styled from 'styled-components'
import apiDescription from 'react-masonry/types.json'
import { JSONOutput } from 'typedoc'

const PropertyWrapper = styled.div`
  margin-bottom: 30px;
`

const List = styled.div``

const ListItem = styled.div`
  margin-bottom: 50px;
`

const ListColumn = styled.div``

const ListTitle = styled.div`
  display: flex;
  margin-bottom: 15px;
`

const PropertyName = styled.span`
  display: inline-block;
  font-weight: 600;
  margin-right: 20px;
`

const PropTitle = styled.h2`
  font-weight: 600;
  font-size: 1.5em;
  margin-bottom: 30px;
`

const PropertyType = styled.span`
  display: inline-block;
  margin-right: 10px;
`

const PropertyDefault = styled.span`
  display: inline-block;
  padding: 2px 5px;
  text-align: center;
  background: #d4d4d4;
  font-style: italic;
  border-radius: 3px;
`

const Interface: React.FunctionComponent<{
  node: JSONOutput.DeclarationReflection
}> = ({ node }) => {
  return (
    <PropertyWrapper key={node.name}>
      <PropTitle id={node.id}>{node.name}</PropTitle>
      {node.children && (
        <List>
          {node.children?.map?.((child) => {
            const commentText = child.comment?.summary
              .filter((c) => c.text)
              .map((c) => c.text)
              .join('')

            const defaultValue = child.comment?.blockTags
              ?.find?.((tag) => tag.tag === '@defaults')
              ?.content?.map((content) => content.text)
              .join('')

            const isOptional = child?.flags?.isOptional

            return (
              <ListItem key={child.name}>
                <ListTitle>
                  <PropertyName>
                    {child.name}
                    {isOptional ? '?' : ''}
                  </PropertyName>
                  <PropertyType>
                    {child?.type && 'id' in child?.type ? (
                      <a href={`#${child?.type?.id}`}>{child?.type?.name}</a>
                    ) : child?.type && 'name' in child?.type ? (
                      child?.type?.name
                    ) : (
                      ''
                    )}
                  </PropertyType>
                  <PropertyDefault>{defaultValue}</PropertyDefault>
                </ListTitle>

                <ListColumn>{commentText}</ListColumn>
              </ListItem>
            )
          })}
        </List>
      )}
    </PropertyWrapper>
  )
}

const TypeAliasWrapper = styled.div`
  display: flex;
`

const TypeAliasTitle = styled.div`
  font-weight: 600;
  font-size: 1.2em;
  margin-right: 20px;
  margin-bottom: 20px;
`

const TypeAlias: React.FunctionComponent<{
  node: JSONOutput.DeclarationReflection
}> = ({ node }) => {
  let typeElements = null

  if (!node.type) {
    return <></>
  }

  switch (node.type.type) {
    case 'intrinsic':
      typeElements = node.type.name
      break
    case 'union':
      typeElements = node.type.types.map((type, index) => (
        <a key={type.id} href={`#${type.id}`}>
          {index !== 0 && ' | '}
          {'name' in type && type.name}
        </a>
      ))
      break
    case 'reflection':
      typeElements = (
        <code>
          {'{'}
          {node.type?.declaration?.children
            ?.map?.(
              (item) =>
                ` ${item.name}: ${
                  'type' in item && 'name' in item?.type!
                    ? item?.type?.name
                    : ''
                }, `,
            )
            .join('')}
          {'}'}
        </code>
      )
  }

  return (
    <TypeAliasWrapper>
      <TypeAliasTitle>{node.name}</TypeAliasTitle>
      <div>{typeElements}</div>
    </TypeAliasWrapper>
  )
}

const Wrapper = styled.div``

export const Props = () => {
  return (
    <Wrapper>
      {(apiDescription! as JSONOutput.ContainerReflection).children!.map(
        (node) => {
          switch (node.kindString) {
            case 'Interface':
              return <Interface key={node.name} node={node} />
            case 'Type alias':
              return <TypeAlias key={node.name} node={node} />
            default:
              return <div key={node.name}>none</div>
          }
        },
      )}
    </Wrapper>
  )
}

export default Props
