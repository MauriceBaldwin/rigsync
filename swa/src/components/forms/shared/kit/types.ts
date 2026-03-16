export interface KitFormFieldsProps {
  manufacturer: string
  model: string
  description: string | undefined
  setManufacturer: (manufacturer: string) => void
  setModel: (model: string) => void
  setDescription: (description: string) => void
}
