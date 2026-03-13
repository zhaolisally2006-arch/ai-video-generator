import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">AI短视频生成器</h1>
          <Link href="/settings" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
            设置
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card title="1. 创建脚本" description="上传图片或输入创意，AI生成分镜脚本" href="/create" />
          <Card title="2. 生成素材" description="根据脚本生成图片和视频片段" href="/generate" />
          <Card title="3. 在线剪辑" description="拖拽式编辑器，合成最终视频" href="/editor" />
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">开始之前</h2>
          <p className="text-gray-700">
            请先前往<Link href="/settings" className="text-blue-600 underline">设置页面</Link>配置AI模型的API密钥
          </p>
        </div>
      </div>
    </div>
  )
}

function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link href={href} className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  )
}
