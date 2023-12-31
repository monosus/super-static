---
name: 'component'
root: '.'
output: 'src'
ignore: ['.']
questions:
  subDir:
    message: 'type of component do you create?(どの種類のコンポーネントを作成しますか？)'
    choices:
      - 'ui|ex:button,list,modal'
      - 'layout|ex:header,footer,sidebar'
  name: 'Please enter a componentName.(コンポーネントの名前を入力してください。ローワーキャメル)'
---

# components/{{ inputs.subDir | split "|" |  slice 0 1 }}/{{ inputs.name | pascal }}/index.tsx

```typescript
type {{ inputs.name | pascal }}Props = {
    children: React.ReactNode
  }


const {{ inputs.name | pascal }} = (props: {{ inputs.name | pascal }}Props) => {
  const { children } = props
  return (
    <div className="{{ inputs.name }}" >
    {children}
    </div>
  );
};

export default {{ inputs.name | pascal }}
```

# components/{{ inputs.subDir | split "|" |  slice 0 1 }}/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.css

```css
@layer {{ inputs.subDir | split "|" |  slice 0 1 }} {
  .{{ inputs.name | kebab }} {

  }
}

@layer state {
  /* If this component has state */
}
```

# assets/{{ inputs.subDir | split "|" |  slice 0 1 }}.css

```css
{{ read output.abs }}
@import '/src/components/{{ inputs.subDir | split "|" |  slice 0 1 }}/{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.css';
```
