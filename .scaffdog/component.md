---
name: 'component'
root: '.'
output: 'src/components'
ignore: ['.']
questions:
  name: 'Please enter a componentName.'
---

# {{ inputs.name | pascal }}/index.tsx

```typescript

import './{{ inputs.name | pascal }}.css'

type {{ inputs.name | pascal }}Props = {
    children: React.ReactNode
  }

export type Props = React.PropsWithChildren<{}>;

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

# {{ inputs.name | pascal }}/{{ inputs.name | pascal }}.css

```css
@layer components {
.{{ inputs.name }} {

}
}

```
