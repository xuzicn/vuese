import Render, {
  RenderResult,
  MarkdownResult
} from '@umeng/vuese-markdown-render'
import { ParserResult } from '@umeng/vuese-parser'

test('Proper rendering of the table header', () => {
  const res: ParserResult = {
    name: 'MyComponent',
    componentDesc: {
      default: ['This is a description of the component'],
      group: ['My Group']
    },
    props: [
      {
        name: 'someProp',
        type: ['String'],
        typeDesc: ['`TOP` / `BOTTOM`'],
        required: true,
        defaultDesc: ['`TOP`'],
        describe: ['Represents the direction of the arrow']
      }
    ],
    events: [
      {
        name: 'click',
        isSync: false,
        syncProp: '',
        describe: ['Triggered when clicked'],
        argumentsDesc: [
          {
            name: 'test',
            type: 'Boolean',
            default: 'false',
            description: 'a boolean value'
          }
        ]
      }
    ],
    slots: [
      {
        name: 'header',
        describe: 'Table header',
        backerDesc: '`<th>{{title}}</th>`',
        bindings: {},
        scoped: false
      }
    ],
    methods: [
      {
        name: 'clear',
        describe: ['Clear form'],
        argumentsDesc: [
          {
            name: 'test',
            type: 'Boolean',
            default: 'false',
            description: 'a boolean value'
          }
        ]
      }
    ]
  }
  const render = new Render(res)
  const renderRes: RenderResult = render.render()
  const markdownRes = render.renderMarkdown() as MarkdownResult
  console.log(renderRes)
  expect(renderRes).toMatchSnapshot()
  expect(markdownRes).toMatchSnapshot()
})

describe('Empty Components (without slots,methods,props,events) can be forced to be rendered', () => {
  test('Does not render an empty component by defaut', () => {
    const res: ParserResult = {
      name: 'MyComponent',
      componentDesc: {
        default: ['This is a description of the component']
      }
    }
    const render = new Render(res)
    const renderRes: RenderResult = render.render()
    const markdownRes = render.renderMarkdown() as MarkdownResult
    expect(markdownRes).toBeNull()
    expect(renderRes).toEqual({})
  })
  test('Does render an empty component by with @vuese in the description', () => {
    const res: ParserResult = {
      name: 'MyComponent',
      componentDesc: {
        default: [
          'This is a description of the component.',
          'Supplementary description'
        ],
        vuese: ['']
      }
    }
    const render = new Render(res)
    const renderRes: RenderResult = render.render()
    const markdownRes = render.renderMarkdown() as MarkdownResult
    expect(markdownRes).not.toBeNull()
    expect(markdownRes).toMatchSnapshot()
    expect(renderRes).toMatchSnapshot()
  })
})
