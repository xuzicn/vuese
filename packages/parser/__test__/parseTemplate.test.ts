import * as path from 'path'
import * as fs from 'fs'
import {
  sfcToAST,
  parseTemplate,
  AstResult,
  SlotResult,
  ParserOptions
} from '@umeng/vuese-parser'

function getAST(fileName: string): object {
  const p = path.resolve(__dirname, `./__fixtures__/${fileName}`)
  const source = fs.readFileSync(p, 'utf-8')
  return sfcToAST(source)
}

test('Default slot with slot description', () => {
  const sfc: AstResult = getAST('defaultSlot.vue')
  const options: ParserOptions = {
    onSlot: jest.fn(slotRes => {
      expect((slotRes as SlotResult).name).toBe('default')
      expect((slotRes as SlotResult).describe).toBe('default slot')
      expect((slotRes as SlotResult).backerDesc).toBe('Default Slot Content')
      expect((slotRes as SlotResult).bindings).toEqual({})
    })
  }
  parseTemplate(sfc.templateAst, options)
  expect(options.onSlot).toBeCalled()
})

test('Default slot with slot description in a v-if', () => {
  const sfc: AstResult = getAST('slotWithVif.vue')
  const options: ParserOptions = {
    onSlot: jest.fn(slotRes => {
      expect((slotRes as SlotResult).name).toBe('default')
    })
  }
  parseTemplate(sfc.templateAst, options)
  expect(options.onSlot).toBeCalled()
})

test('Named slot with slot description', () => {
  const sfc: AstResult = getAST('namedSlot.vue')
  const options: ParserOptions = {
    onSlot(slotRes) {
      expect((slotRes as SlotResult).name).toBe('header')
      expect((slotRes as SlotResult).describe).toBe('head slot')
      expect((slotRes as SlotResult).backerDesc).toBe('Default Slot Content')
      expect((slotRes as SlotResult).bindings).toEqual({})
    }
  }
  parseTemplate(sfc.templateAst, options)
})

test('Named slot with slot description and bingdings', () => {
  const sfc: AstResult = getAST('slotWithBindings.vue')
  const options: ParserOptions = {
    onSlot(slotRes) {
      expect((slotRes as SlotResult).name).toBe('header')
      expect((slotRes as SlotResult).describe).toBe('Named slot')
      expect((slotRes as SlotResult).backerDesc).toBe('Default Slot Content')
      expect((slotRes as SlotResult).bindings).toEqual({
        a: 'someData',
        b: 'str'
      })
    }
  }
  parseTemplate(sfc.templateAst, options)
})
