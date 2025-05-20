import { Card, CardContent } from '../ui/card'

interface DashboardTileProps {
  title: string
  value: number | string
  subtitle?: string
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
}
const DashboardTile = ({ title, value }: DashboardTileProps) => {
  return (
    <Card className="py-0">
      <CardContent className="p-4 min-w-30">
        <p className="text-xs font-medium text-muted-foreground mb-2">
          {title}
        </p>
        <p className="text-xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}

export default DashboardTile
