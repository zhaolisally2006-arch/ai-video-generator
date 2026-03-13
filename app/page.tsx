import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-6xl mx-auto p-8">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              AI短视频生成器
            </h1>
            <p className="text-gray-600 mt-2">一键生成专业短视频</p>
          </div>
          <Link href="/settings">
            <Button variant="outline" size="lg">⚙️ 设置</Button>
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <WorkflowCard
            step="1"
            title="创建脚本"
            description="上传图片或输入创意，AI生成分镜脚本"
            href="/create"
            icon="✨"
          />
          <WorkflowCard
            step="2"
            title="生成素材"
            description="根据脚本生成图片和视频片段"
            href="/generate"
            icon="🎨"
          />
          <WorkflowCard
            step="3"
            title="在线剪辑"
            description="拖拽式编辑器，合成最终视频"
            href="/editor"
            icon="🎬"
          />
        </div>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle>💡 开始之前</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              请先前往<Link href="/settings" className="text-blue-600 font-medium hover:underline">设置页面</Link>配置AI模型的API密钥
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function WorkflowCard({ step, title, description, href, icon }: any) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border-2 hover:border-blue-300">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{icon}</span>
            <span className="text-sm font-semibold text-blue-600">步骤 {step}</span>
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
