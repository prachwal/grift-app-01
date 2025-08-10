# Textarea Component Documentation

## Overview
The Textarea component provides a multi-line text input with advanced features like auto-resize, character counting, validation, and comprehensive styling options. It's designed for collecting longer text content from users with excellent usability and accessibility features.

## Features
- **Auto-resize**: Automatically adjust height based on content
- **Size Variants**: Small (sm), Medium (md), and Large (lg) sizes
- **Visual Variants**: Default, filled, bordered, and borderless styles
- **Character Limits**: Built-in character counting and validation
- **Validation States**: Error, success, and warning states with feedback
- **Accessibility**: Full ARIA compliance with proper labeling and keyboard navigation
- **Resize Control**: Configurable resize behavior (none, vertical, horizontal, both)
- **Dark Mode**: Complete dark theme support

## Basic Usage

### Simple Textarea
```typescript
import { Textarea } from '@nebula/components'

function MyForm() {
  return (
    <Textarea 
      placeholder="Enter your message..." 
      rows={4}
    />
  )
}
```

### Controlled Textarea
```typescript
import { Textarea } from '@nebula/components'
import { useState } from 'preact/hooks'

function ControlledTextarea() {
  const [value, setValue] = useState('')
  
  return (
    <Textarea 
      value={value}
      onInput={(e) => setValue((e.target as HTMLTextAreaElement).value)}
      placeholder="Controlled textarea"
      rows={4}
    />
  )
}
```

### With Label
```typescript
import { Textarea, Label } from '@nebula/components'

function LabeledTextarea() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea 
        id="message"
        placeholder="Type your message here..." 
        rows={4}
      />
    </div>
  )
}
```

## Sizes
The Textarea component supports three sizes:

```typescript
<Textarea size="sm" placeholder="Small textarea" rows={3} />
<Textarea size="md" placeholder="Medium textarea" rows={4} />  
<Textarea size="lg" placeholder="Large textarea" rows={5} />
```

## Variants
Different visual styles for various design needs:

```typescript
<Textarea variant="default" placeholder="Default style" />
<Textarea variant="filled" placeholder="Filled background" />
<Textarea variant="bordered" placeholder="Prominent border" />
<Textarea variant="borderless" placeholder="No border" />
```

## Auto-resize Functionality
Automatically adjust height based on content:

```typescript
import { Textarea } from '@nebula/components'

function AutoResizeTextarea() {
  return (
    <Textarea
      autoResize
      minRows={2}
      maxRows={8}
      placeholder="This textarea will grow as you type..."
    />
  )
}
```

## Character Counting and Limits
Built-in character counting with validation:

```typescript
import { Textarea } from '@nebula/components'
import { useState } from 'preact/hooks'

function CharacterLimitTextarea() {
  const [value, setValue] = useState('')
  const maxLength = 280
  
  return (
    <div>
      <Textarea
        value={value}
        onInput={(e) => setValue((e.target as HTMLTextAreaElement).value)}
        maxLength={maxLength}
        showCharacterCount
        placeholder="Tweet your thoughts..."
        rows={3}
      />
      <div className="text-right text-sm text-gray-500 mt-1">
        {value.length}/{maxLength}
      </div>
    </div>
  )
}
```

## States
Different states for user feedback:

```typescript
<Textarea placeholder="Normal state" />
<Textarea disabled placeholder="Disabled state" />
<Textarea error placeholder="Error state" />
<Textarea success placeholder="Success state" />
<Textarea loading placeholder="Loading state" />
```

## Resize Control
Configure how users can resize the textarea:

```typescript
// No resize
<Textarea resize="none" placeholder="Cannot be resized" />

// Vertical resize only (default)
<Textarea resize="vertical" placeholder="Resize vertically" />

// Horizontal resize only
<Textarea resize="horizontal" placeholder="Resize horizontally" />

// Both directions
<Textarea resize="both" placeholder="Resize in both directions" />
```

## Validation
Built-in validation with error messages:

```typescript
import { Textarea, Label } from '@nebula/components'
import { useState } from 'preact/hooks'

function ValidatedTextarea() {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  
  const validate = (text: string) => {
    if (text.length < 10) {
      setError('Message must be at least 10 characters long')
    } else if (text.length > 500) {
      setError('Message cannot exceed 500 characters')
    } else {
      setError('')
    }
  }
  
  return (
    <div>
      <Label htmlFor="message">Message *</Label>
      <Textarea
        id="message"
        value={value}
        onInput={(e) => {
          const newValue = (e.target as HTMLTextAreaElement).value
          setValue(newValue)
          validate(newValue)
        }}
        error={!!error}
        placeholder="Enter your message..."
        rows={4}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}
```

## Comment System Example
Complete comment form with textarea:

```typescript
import { Textarea, Button, Avatar, Label } from '@nebula/components'
import { useState } from 'preact/hooks'

function CommentForm() {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (comment.trim().length < 5) return
    
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setComment('')
    setIsSubmitting(false)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <Avatar src="https://picsum.photos/40/40" size="sm" />
        <div className="flex-1">
          <Label htmlFor="comment">Add a comment</Label>
          <Textarea
            id="comment"
            value={comment}
            onInput={(e) => setComment((e.target as HTMLTextAreaElement).value)}
            placeholder="What are your thoughts?"
            autoResize
            minRows={2}
            maxRows={6}
            className="mt-1"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {comment.length}/1000 characters
            </span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setComment('')}
                disabled={!comment.trim() || isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                size="sm"
                disabled={comment.trim().length < 5 || isSubmitting}
                loading={isSubmitting}
              >
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
```

## Rich Text Editor Base
Use textarea as foundation for rich text editors:

```typescript
import { Textarea, Button } from '@nebula/components'
import { useState } from 'preact/hooks'
import { Bold, Italic, List, Link } from 'lucide-preact'

function RichTextBase() {
  const [content, setContent] = useState('')
  const [activeFormats, setActiveFormats] = useState<string[]>([])
  
  const insertText = (before: string, after = '') => {
    const textarea = document.getElementById('rich-textarea') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selectedText = text.substring(start, end)
    
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)
    setContent(newText)
    
    // Focus and set cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }
  
  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg">
      {/* Toolbar */}
      <div className="border-b border-gray-300 dark:border-gray-600 p-2 flex gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertText('**', '**')}
          className={activeFormats.includes('bold') ? 'bg-blue-100' : ''}
        >
          <Bold size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertText('*', '*')}
        >
          <Italic size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertText('\n- ')}
        >
          <List size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => insertText('[', '](url)')}
        >
          <Link size={16} />
        </Button>
      </div>
      
      {/* Editor */}
      <Textarea
        id="rich-textarea"
        value={content}
        onInput={(e) => setContent((e.target as HTMLTextAreaElement).value)}
        placeholder="Write your content with markdown formatting..."
        variant="borderless"
        autoResize
        minRows={5}
        maxRows={15}
        className="resize-none"
      />
      
      {/* Footer */}
      <div className="border-t border-gray-300 dark:border-gray-600 p-2 flex justify-between text-sm text-gray-500">
        <span>Markdown supported</span>
        <span>{content.length} characters</span>
      </div>
    </div>
  )
}
```

## Props Reference

| Prop                 | Type                                                  | Default      | Description                              |
| -------------------- | ----------------------------------------------------- | ------------ | ---------------------------------------- |
| `size`               | `'sm' \| 'md' \| 'lg'`                                | `'md'`       | Size variant of the textarea             |
| `variant`            | `'default' \| 'filled' \| 'bordered' \| 'borderless'` | `'default'`  | Visual style variant                     |
| `rows`               | `number`                                              | `4`          | Number of visible text lines             |
| `cols`               | `number`                                              | -            | Number of visible character widths       |
| `autoResize`         | `boolean`                                             | `false`      | Auto-adjust height based on content      |
| `minRows`            | `number`                                              | `2`          | Minimum rows when auto-resize is enabled |
| `maxRows`            | `number`                                              | `10`         | Maximum rows when auto-resize is enabled |
| `resize`             | `'none' \| 'vertical' \| 'horizontal' \| 'both'`      | `'vertical'` | Resize behavior                          |
| `disabled`           | `boolean`                                             | `false`      | Whether the textarea is disabled         |
| `error`              | `boolean`                                             | `false`      | Whether to show error state              |
| `success`            | `boolean`                                             | `false`      | Whether to show success state            |
| `loading`            | `boolean`                                             | `false`      | Whether to show loading state            |
| `showCharacterCount` | `boolean`                                             | `false`      | Whether to display character count       |
| `maxLength`          | `number`                                              | -            | Maximum character limit                  |
| `placeholder`        | `string`                                              | -            | Placeholder text                         |
| `value`              | `string`                                              | -            | Controlled value                         |
| `defaultValue`       | `string`                                              | -            | Default value for uncontrolled usage     |
| `onInput`            | `(e: Event) => void`                                  | -            | Input event handler                      |
| `onChange`           | `(e: Event) => void`                                  | -            | Change event handler                     |
| `onFocus`            | `(e: FocusEvent) => void`                             | -            | Focus event handler                      |
| `onBlur`             | `(e: FocusEvent) => void`                             | -            | Blur event handler                       |
| `className`          | `string`                                              | -            | Additional CSS classes                   |
| `id`                 | `string`                                              | -            | HTML id attribute                        |
| `name`               | `string`                                              | -            | HTML name attribute                      |
| `required`           | `boolean`                                             | `false`      | Whether the textarea is required         |
| `readonly`           | `boolean`                                             | `false`      | Whether the textarea is readonly         |
| `autoFocus`          | `boolean`                                             | `false`      | Whether to auto-focus on mount           |
| `wrap`               | `'hard' \| 'soft'`                                    | `'soft'`     | Text wrapping behavior                   |
| `spellCheck`         | `boolean`                                             | `true`       | Enable/disable spell checking            |

## Accessibility
The Textarea component provides comprehensive accessibility support:

- **ARIA Labels**: Proper `aria-label` and `aria-describedby` attributes
- **Error States**: `aria-invalid` when in error state
- **Required Fields**: `aria-required` for required textareas
- **Character Limits**: `aria-describedby` linking to character count
- **Keyboard Navigation**: Full keyboard support with Tab and arrow keys
- **Screen Readers**: Compatible with all major screen readers
- **Focus Management**: Visible focus indicators and proper focus order
- **High Contrast**: Support for high contrast mode

## Examples

### Contact Form
```typescript
import { Textarea, Input, Button, Label } from '@nebula/components'
import { useState } from 'preact/hooks'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  return (
    <form className="space-y-4 max-w-md">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onInput={(e) => setFormData({
            ...formData, 
            name: (e.target as HTMLInputElement).value
          })}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onInput={(e) => setFormData({
            ...formData, 
            email: (e.target as HTMLInputElement).value
          })}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          value={formData.message}
          onInput={(e) => setFormData({
            ...formData, 
            message: (e.target as HTMLTextAreaElement).value
          })}
          placeholder="Tell us about your inquiry..."
          autoResize
          minRows={3}
          maxRows={8}
          required
        />
      </div>
      
      <Button type="submit" size="lg" className="w-full">
        Send Message
      </Button>
    </form>
  )
}
```
