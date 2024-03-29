import type { ComponentProps, FunctionComponent } from 'react'
import type { JSONOutput } from 'typedoc'
import apiDescription from 'react-masonry/types.json'

const Link = (props: ComponentProps<'a'>) => (
  <a {...props} className="property-link" />
)

const ListTitle = (props: ComponentProps<'div'>) => (
  <div {...props} className="property-list-title" />
)

const PropertyName = (props: ComponentProps<'span'>) => (
  <span {...props} className="property-name" />
)

const PropTitle = (props: ComponentProps<'h2'>) => (
  <h2 {...props} className="property-title" />
)

const PropertyType = (props: ComponentProps<'span'>) => (
  <span {...props} className="property-type" />
)

const PropertyDefault = (props: ComponentProps<'span'>) => (
  <span {...props} className="property-default" />
)

const Interface: FunctionComponent<{
  node: JSONOutput.DeclarationReflection
}> = ({ node }) => {
  return (
    <div className="property-wrapper" key={node.name}>
      <PropTitle id={`${node.id}`}>{node.name}</PropTitle>
      {node.children && (
        <div className="property-list">
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
              <div className="property-list-item" key={child.name}>
                <ListTitle>
                  <PropertyName>
                    {child.name}
                    {isOptional ? '?' : ''}
                  </PropertyName>
                  <PropertyType>
                    {child?.type && 'id' in child?.type ? (
                      <Link href={`#${child?.type?.id}`}>
                        {child?.type?.name}
                      </Link>
                    ) : child?.type && 'name' in child?.type ? (
                      child?.type?.name
                    ) : (
                      ''
                    )}
                  </PropertyType>
                  <PropertyDefault>{defaultValue}</PropertyDefault>
                </ListTitle>

                <div className="property-list-column">{commentText}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const TypeAliasWrapper = (props: ComponentProps<'div'>) => (
  <div {...props} className="type-alias-wrapper" />
)

const TypeAliasTitle = (props: ComponentProps<'div'>) => (
  <div {...props} className="type-alias-title" />
)

const TypeAlias: FunctionComponent<{
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
        <Link key={index} href={`#${(type as any).id}`}>
          {index !== 0 && ' | '}
          {'name' in type && type.name}
        </Link>
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

export const Docs = (props) => {
  return (
    <div>
      {/* @ts-ignore */}
      {(apiDescription! as JSONOutput.ContainerReflection).children!.map(
        (node: any) => {
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
    </div>
  )
}
