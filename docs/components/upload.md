# Upload Component Documentation

## Overview
The Upload component provides a comprehensive file upload interface with drag-and-drop support, progress tracking, validation, and multiple file handling. Perfect for forms, media uploads, and document management systems.

## Features
- **Drag & Drop**: Intuitive drag-and-drop file selection
- **Multiple Files**: Support for single and multiple file uploads
- **Progress Tracking**: Real-time upload progress with visual indicators
- **File Validation**: Size limits, type restrictions, and custom validation
- **Preview Support**: Image previews and file type icons
- **Size Variants**: Small (sm), Medium (md), and Large (lg) sizes
- **Upload States**: Loading, success, error, and idle states
- **Customizable UI**: Custom upload areas and file list displays
- **Accessibility**: Full keyboard navigation and screen reader support
- **Dark Mode**: Complete dark theme compatibility

## Basic Usage

### Simple Upload
```typescript
import { Upload } from '@nebula/components'

function SimpleUpload() {
  const handleFileSelect = (files: File[]) => {
    console.log('Selected files:', files)
  }
  
  return (
    <Upload
      onFileSelect={handleFileSelect}
      label="Upload Files"
      accept="image/*,application/pdf"
    />
  )
}
```

### Controlled Upload
```typescript
import { Upload } from '@nebula/components'
import { useState } from 'preact/hooks'

function ControlledUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  
  const handleUpload = async (selectedFiles: File[]) => {
    setUploading(true)
    
    try {
      // Simulate upload process
      for (const file of selectedFiles) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setFiles(prev => [...prev, file])
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <Upload
      files={files}
      onFileSelect={handleUpload}
      uploading={uploading}
      label="Upload Documents"
      multiple
    />
  )
}
```

### Drag and Drop Upload
```typescript
import { Upload } from '@nebula/components'
import { useState } from 'preact/hooks'

function DragDropUpload() {
  const [dragActive, setDragActive] = useState(false)
  
  const handleFileSelect = (files: File[]) => {
    console.log('Files selected:', files)
  }
  
  return (
    <Upload
      onFileSelect={handleFileSelect}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDrop={() => setDragActive(false)}
      dragActive={dragActive}
      label="Drag & Drop Files"
      description="Drop files here or click to select"
      multiple
      className="min-h-48"
    />
  )
}
```

## Sizes
The Upload component supports three sizes:

```typescript
<Upload size="sm" label="Small Upload" />
<Upload size="md" label="Medium Upload" />
<Upload size="lg" label="Large Upload" />
```

## File Validation

### File Type Restrictions
```typescript
import { Upload } from '@nebula/components'

function TypeRestrictedUpload() {
  return (
    <div className="space-y-4">
      {/* Images only */}
      <Upload
        accept="image/*"
        label="Upload Images"
        description="PNG, JPG, GIF up to 10MB"
        maxFileSize={10 * 1024 * 1024} // 10MB
      />
      
      {/* Documents only */}
      <Upload
        accept=".pdf,.doc,.docx"
        label="Upload Documents"
        description="PDF, Word documents up to 5MB"
        maxFileSize={5 * 1024 * 1024} // 5MB
      />
      
      {/* Specific file types */}
      <Upload
        accept=".csv,.xlsx,.json"
        label="Upload Data Files"
        description="CSV, Excel, or JSON files only"
        maxFileSize={2 * 1024 * 1024} // 2MB
      />
    </div>
  )
}
```

### Custom Validation
```typescript
import { Upload } from '@nebula/components'

function CustomValidationUpload() {
  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      return 'File size must be less than 5MB'
    }
    
    // Check file name
    if (file.name.includes(' ')) {
      return 'File name cannot contain spaces'
    }
    
    // Check image dimensions (for images)
    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          if (img.width < 300 || img.height < 300) {
            resolve('Image must be at least 300x300 pixels')
          } else {
            resolve(null)
          }
        }
        img.src = URL.createObjectURL(file)
      })
    }
    
    return null
  }
  
  return (
    <Upload
      validateFile={validateFile}
      label="Upload with Validation"
      description="Images must be 300x300px minimum, no spaces in filename"
      accept="image/*"
    />
  )
}
```

### File Limits
```typescript
import { Upload } from '@nebula/components'

function LimitedUpload() {
  return (
    <Upload
      maxFiles={3}
      maxFileSize={10 * 1024 * 1024} // 10MB per file
      maxTotalSize={25 * 1024 * 1024} // 25MB total
      label="Upload Up To 3 Files"
      description="Maximum 3 files, 10MB each, 25MB total"
      multiple
    />
  )
}
```

## Progress Tracking

### Upload with Progress
```typescript
import { Upload, ProgressBar } from '@nebula/components'
import { useState } from 'preact/hooks'

interface UploadProgress {
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}

function ProgressUpload() {
  const [uploads, setUploads] = useState<UploadProgress[]>([])
  
  const simulateUpload = async (file: File) => {
    const uploadId = Date.now() + Math.random()
    
    // Add to upload list
    setUploads(prev => [...prev, {
      file,
      progress: 0,
      status: 'uploading'
    }])
    
    try {
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        
        setUploads(prev => 
          prev.map(upload => 
            upload.file === file 
              ? { ...upload, progress }
              : upload
          )
        )
      }
      
      // Mark as completed
      setUploads(prev => 
        prev.map(upload => 
          upload.file === file 
            ? { ...upload, status: 'completed' }
            : upload
        )
      )
      
    } catch (error) {
      setUploads(prev => 
        prev.map(upload => 
          upload.file === file 
            ? { 
                ...upload, 
                status: 'error', 
                error: 'Upload failed' 
              }
            : upload
        )
      )
    }
  }
  
  const handleFileSelect = (files: File[]) => {
    files.forEach(simulateUpload)
  }
  
  const clearCompleted = () => {
    setUploads(prev => prev.filter(upload => upload.status !== 'completed'))
  }
  
  return (
    <div className="space-y-4">
      <Upload
        onFileSelect={handleFileSelect}
        label="Upload with Progress"
        multiple
        accept="image/*"
      />
      
      {uploads.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Upload Progress</h4>
            <button
              onClick={clearCompleted}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear Completed
            </button>
          </div>
          
          {uploads.map((upload, index) => (
            <div key={index} className="p-3 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium truncate">
                  {upload.file.name}
                </span>
                <span className="text-xs text-gray-500">
                  {(upload.file.size / 1024 / 1024).toFixed(1)}MB
                </span>
              </div>
              
              {upload.status === 'uploading' && (
                <ProgressBar 
                  value={upload.progress}
                  size="sm"
                  showValue
                />
              )}
              
              {upload.status === 'completed' && (
                <div className="text-sm text-green-600">✓ Upload completed</div>
              )}
              
              {upload.status === 'error' && (
                <div className="text-sm text-red-600">
                  ✗ {upload.error || 'Upload failed'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Image Upload with Preview

### Image Gallery Upload
```typescript
import { Upload, Button } from '@nebula/components'
import { useState } from 'preact/hooks'
import { X, Eye } from 'lucide-preact'

interface ImageFile {
  file: File
  preview: string
  id: string
}

function ImageGalleryUpload() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null)
  
  const handleFileSelect = (files: File[]) => {
    const newImages = files
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: Date.now() + Math.random().toString()
      }))
    
    setImages(prev => [...prev, ...newImages])
  }
  
  const removeImage = (id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id)
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview)
      }
      return prev.filter(img => img.id !== id)
    })
  }
  
  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview))
    setImages([])
  }
  
  return (
    <div className="space-y-6">
      <Upload
        onFileSelect={handleFileSelect}
        label="Upload Images"
        description="Select multiple images to create a gallery"
        accept="image/*"
        multiple
        maxFiles={10}
      />
      
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              Selected Images ({images.length})
            </h4>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAll}
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image) => (
              <div 
                key={image.id}
                className="relative group aspect-square border rounded-lg overflow-hidden"
              >
                <img
                  src={image.preview}
                  alt={image.file.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white text-xs truncate">
                    {image.file.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-4xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.preview}
              alt={selectedImage.file.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
```

## File Management

### File List with Actions
```typescript
import { Upload, Button } from '@nebula/components'
import { useState } from 'preact/hooks'
import { FileText, Image, Film, Music, Archive, X } from 'lucide-preact'

interface FileItem {
  file: File
  id: string
  uploaded: boolean
  error?: string
}

function FileManagerUpload() {
  const [files, setFiles] = useState<FileItem[]>([])
  
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-5 h-5 text-blue-500" />
    if (file.type.startsWith('video/')) return <Film className="w-5 h-5 text-purple-500" />
    if (file.type.startsWith('audio/')) return <Music className="w-5 h-5 text-green-500" />
    if (file.type.includes('zip') || file.type.includes('rar')) return <Archive className="w-5 h-5 text-orange-500" />
    return <FileText className="w-5 h-5 text-gray-500" />
  }
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  const handleFileSelect = (newFiles: File[]) => {
    const fileItems = newFiles.map(file => ({
      file,
      id: Date.now() + Math.random().toString(),
      uploaded: false
    }))
    setFiles(prev => [...prev, ...fileItems])
  }
  
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }
  
  const uploadAll = async () => {
    for (const fileItem of files) {
      if (!fileItem.uploaded) {
        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 1000))
        setFiles(prev => 
          prev.map(f => 
            f.id === fileItem.id 
              ? { ...f, uploaded: true }
              : f
          )
        )
      }
    }
  }
  
  const clearAll = () => {
    setFiles([])
  }
  
  return (
    <div className="space-y-4">
      <Upload
        onFileSelect={handleFileSelect}
        label="File Manager Upload"
        description="Upload any type of file"
        multiple
      />
      
      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">
              Files ({files.length})
            </h4>
            <div className="flex gap-2">
              <Button 
                variant="primary" 
                size="sm" 
                onClick={uploadAll}
                disabled={files.every(f => f.uploaded)}
              >
                Upload All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAll}
              >
                Clear All
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            {files.map((fileItem) => (
              <div 
                key={fileItem.id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                {getFileIcon(fileItem.file)}
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {fileItem.file.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{formatFileSize(fileItem.file.size)}</span>
                    <span>•</span>
                    <span>{fileItem.file.type || 'Unknown type'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {fileItem.uploaded ? (
                    <span className="text-green-600 text-sm">✓ Uploaded</span>
                  ) : (
                    <span className="text-gray-500 text-sm">Pending</span>
                  )}
                  
                  <button
                    onClick={() => removeFile(fileItem.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

## Props Reference

### Upload Props
| Prop                | Type                                                        | Default                                | Description                  |
| ------------------- | ----------------------------------------------------------- | -------------------------------------- | ---------------------------- |
| `files`             | `File[]`                                                    | -                                      | Controlled files array       |
| `onFileSelect`      | `(files: File[]) => void`                                   | -                                      | File selection handler       |
| `onFileRemove`      | `(index: number) => void`                                   | -                                      | File removal handler         |
| `onDrop`            | `(files: File[]) => void`                                   | -                                      | Drop event handler           |
| `onDragEnter`       | `(e: DragEvent) => void`                                    | -                                      | Drag enter handler           |
| `onDragLeave`       | `(e: DragEvent) => void`                                    | -                                      | Drag leave handler           |
| `accept`            | `string`                                                    | -                                      | Accepted file types          |
| `multiple`          | `boolean`                                                   | `false`                                | Allow multiple files         |
| `disabled`          | `boolean`                                                   | `false`                                | Disable the upload           |
| `uploading`         | `boolean`                                                   | `false`                                | Show uploading state         |
| `error`             | `boolean`                                                   | `false`                                | Show error state             |
| `success`           | `boolean`                                                   | `false`                                | Show success state           |
| `size`              | `'sm' \| 'md' \| 'lg'`                                      | `'md'`                                 | Size variant                 |
| `label`             | `string`                                                    | -                                      | Upload area label            |
| `description`       | `string`                                                    | -                                      | Upload area description      |
| `placeholder`       | `string`                                                    | `'Click to select or drag files here'` | Placeholder text             |
| `maxFiles`          | `number`                                                    | -                                      | Maximum number of files      |
| `maxFileSize`       | `number`                                                    | -                                      | Maximum file size in bytes   |
| `maxTotalSize`      | `number`                                                    | -                                      | Maximum total size in bytes  |
| `validateFile`      | `(file: File) => string \| null \| Promise<string \| null>` | -                                      | Custom file validation       |
| `showFileList`      | `boolean`                                                   | `true`                                 | Show selected files list     |
| `showProgress`      | `boolean`                                                   | `true`                                 | Show upload progress         |
| `dragActive`        | `boolean`                                                   | `false`                                | Controlled drag active state |
| `className`         | `string`                                                    | -                                      | Additional CSS classes       |
| `dropzoneClassName` | `string`                                                    | -                                      | Dropzone area classes        |
| `fileListClassName` | `string`                                                    | -                                      | File list container classes  |

### FileListItem Props
| Prop           | Type                                                 | Default     | Description             |
| -------------- | ---------------------------------------------------- | ----------- | ----------------------- |
| `file`         | `File`                                               | -           | File object             |
| `onRemove`     | `() => void`                                         | -           | Remove handler          |
| `progress`     | `number`                                             | -           | Upload progress (0-100) |
| `status`       | `'pending' \| 'uploading' \| 'completed' \| 'error'` | `'pending'` | Upload status           |
| `error`        | `string`                                             | -           | Error message           |
| `showPreview`  | `boolean`                                            | `true`      | Show file preview       |
| `showProgress` | `boolean`                                            | `true`      | Show progress bar       |
| `className`    | `string`                                             | -           | Additional CSS classes  |

## Accessibility
The Upload component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses proper `button` role and `aria-describedby` attributes
- **Keyboard Navigation**: Tab navigation and Enter/Space activation
- **Screen Readers**: Clear announcements of file selection and status
- **Focus Management**: Proper focus indicators and focus management
- **High Contrast**: Support for high contrast mode
- **Drag and Drop**: Keyboard accessible alternatives to drag and drop
- **File Information**: Clear file details and status announcements

## Examples

### Document Upload Form
```typescript
import { Upload, Input, Textarea, Button, Card, Select } from '@nebula/components'
import { useState } from 'preact/hooks'

interface DocumentForm {
  title: string
  description: string
  category: string
  files: File[]
  tags: string[]
}

function DocumentUploadForm() {
  const [formData, setFormData] = useState<DocumentForm>({
    title: '',
    description: '',
    category: '',
    files: [],
    tags: []
  })
  
  const [uploading, setUploading] = useState(false)
  
  const categories = [
    { value: 'report', label: 'Report' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'contract', label: 'Contract' },
    { value: 'presentation', label: 'Presentation' },
    { value: 'other', label: 'Other' }
  ]
  
  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    setUploading(true)
    
    try {
      // Simulate form submission with file upload
      await new Promise(resolve => setTimeout(resolve, 3000))
      console.log('Document uploaded:', formData)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        files: [],
        tags: []
      })
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <Card className="max-w-2xl">
      <form onSubmit={handleSubmit} className="p-6">
        <h3 className="text-lg font-semibold mb-6">Upload Document</h3>
        
        <div className="space-y-4">
          <Input
            label="Document Title"
            value={formData.title}
            onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
            placeholder="Enter document title..."
            required
          />
          
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            placeholder="Describe the document..."
            rows={3}
          />
          
          <Select
            options={categories}
            value={formData.category}
            onChange={(value) => setFormData(prev => ({ ...prev, category: value as string }))}
            label="Category"
            placeholder="Select category..."
            required
          />
          
          <Upload
            files={formData.files}
            onFileSelect={(files) => setFormData(prev => ({ ...prev, files }))}
            label="Upload Files"
            description="PDF, Word, or PowerPoint files up to 10MB each"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            maxFileSize={10 * 1024 * 1024}
            multiple
            maxFiles={5}
            uploading={uploading}
          />
          
          <div className="pt-4">
            <Button
              type="submit"
              loading={uploading}
              disabled={!formData.title || !formData.category || formData.files.length === 0}
              className="w-full"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
```
