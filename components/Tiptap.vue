<template>
  <div>
    <Transition>
      <div v-if="editor && showToolbar" style="position: relative">
        <div class="action-buttons-frame" @click="keepToolbar = true">
          <ColorPicker
            :parent="{
              color: _color.reversePick(
                editor.getAttributes('textStyle').color
              ),
            }"
            class="mx-2"
            :top="-20"
            :left="-105"
            style="position: relative; top: 7px"
            @update:color="onColorClick"
          />

          <button
            v-for="index in [
              { size: 1, icon: 1 },
              { size: 3, icon: 2 },
              { size: 5, icon: 3 },
            ]"
            class="action-button"
            :class="{
              active: editor.isActive('heading', { level: index.size }),
            }"
            @click="onHeadingClick(index.size)"
          >
            <span
              v-html="_icon('type-h' + index.icon, _color.pick(null), 25)"
            ></span>
          </button>

          <button
            v-for="({ slug, icon, active }, index) in textActions"
            class="action-button"
            :class="{ active: editor.isActive(active) }"
            @click="onActionClick(slug)"
          >
            <span v-html="_icon(icon, _color.pick(null), 25)"></span>
          </button>
        </div>
      </div>
    </Transition>

    <editor-content :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'

let props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

let showToolbar = ref(false)
let keepToolbar = ref(false)
let editor: any = ref(null)
let textActions = [
  { slug: 'bold', icon: 'type-bold', active: 'bold' },
  { slug: 'italic', icon: 'type-italic', active: 'italic' },
  { slug: 'underline', icon: 'type-underline', active: 'underline' },
  { slug: 'bulletList', icon: 'list-ul', active: 'bulletList' },
  { slug: 'orderedList', icon: 'list-ol', active: 'orderedList' },
  { slug: 'undo', icon: 'arrow-counterclockwise', active: 'undo' },
  { slug: 'redo', icon: 'arrow-clockwise', active: 'redo' },
]

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'tiptap-field-paragraph',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'tiptap-field-list',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'tiptap-field-list',
          },
        },
      }),
      Underline,
      Color,
      TextStyle,
    ],
    editorProps: {
      attributes: {
        class: 'form-control',
      },
    },
    onUpdate: () => {
      emit('update:modelValue', editor.value.getHTML())
    },
    onFocus() {
      setShowToolbar(true)
    },
    onBlur() {
      setShowToolbar(false, 50)
    },
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    if (editor.value.getHTML() === newValue) return
    editor.value.commands.setContent(props.modelValue, false)
  }
)

function onActionClick(slug: string) {
  keepToolbar.value = true
  const vm = editor.value.chain().focus()
  const actionTriggers: any = {
    bold: () => vm.toggleBold().run(),
    italic: () => vm.toggleItalic().run(),
    underline: () => vm.toggleUnderline().run(),
    bulletList: () => vm.toggleBulletList().run(),
    orderedList: () => vm.toggleOrderedList().run(),
    undo: () => vm.undo().run(),
    redo: () => vm.redo().run(),
  }

  actionTriggers[slug]()
}

function onHeadingClick(index: number) {
  keepToolbar.value = true
  const vm = editor.value.chain().focus()
  vm.toggleHeading({ level: index }).run()
}

function onColorClick(color: any) {
  const pickedColor = _color.pick(color)

  editor.value.chain().focus().setColor(pickedColor).run()
}

function setShowToolbar(value: boolean, timeoutValue?: number) {
  setTimeout(() => {
    if (value == false && keepToolbar.value == true) {
      keepToolbar.value = false
      return
    }
    if (timeoutValue) {
      setTimeout(() => {
        showToolbar.value = value
      }, timeoutValue)
    } else {
      showToolbar.value = value
    }
  }, 100)
}
</script>

<style lang="scss" scoped>
$button-active-color: rgb(131, 189, 204);
.active {
  background-color: $button-active-color !important;
}
.action-buttons-frame {
  min-width: 200px;
  background-color: white;
  border: 1px rgb(132, 165, 173) solid;
  border-radius: 5px;
  position: absolute;
  bottom: 5px;
  right: 0px;
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
}
.action-button {
  margin: 2px;
  border-radius: 5px;
  border: 1px rgb(132, 165, 173) solid;
  padding: 0 3px 1px 4px;
  background-color: rgb(235, 251, 255);
  transition: background-color 0.4s ease;
}
.action-button:hover {
  background-color: $button-active-color;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

<style>
.tiptap-field-paragraph {
  margin-bottom: 0px !important;
  min-height: 24px;
  flex-shrink: 1;
}

ul .tiptap-field-paragraph,
ol .tiptap-field-paragraph {
  text-align: left;
}

.tiptap-field-list {
  margin-bottom: 0px !important;
  flex-shrink: 1;
}
</style>
