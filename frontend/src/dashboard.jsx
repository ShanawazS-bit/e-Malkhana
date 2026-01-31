import { useEffect, useState } from 'react'
import axios from 'axios'
import { Header } from '@/components/header'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Archive, Clock, FileText } from 'lucide-react'

export default function Dashboard() {
    const [stats, setStats] = useState({
        total_cases: 0,
        pending_cases: 0,
        disposed_cases: 0
    })
    const [loading, setLoading] = useState(true)

    const [recentProperties, setRecentProperties] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Stats
                const statsRes = await axios.get('http://127.0.0.1:8000/api/inventory/dashboard-stats/')
                setStats(statsRes.data)

                // Fetch Recent Properties
                const propsRes = await axios.get('http://127.0.0.1:8000/api/inventory/properties/')
                setRecentProperties(propsRes.data)
            } catch (error) {
                console.error("Failed to fetch dashboard data", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            <main className="container mx-auto p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-yellow-500 pl-4">
                        Dashboard Overview
                    </h2>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Last updated: Just now</span>
                        <a href="/case-entry" className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium text-sm">
                            + New Case
                        </a>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-6 md:grid-cols-3 mb-10">

                    {/* Total Cases Card */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-yellow-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                                Total Cases
                            </CardTitle>
                            <FileText className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-gray-800">{loading ? "..." : stats.total_cases}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Registered in system
                            </p>
                        </CardContent>
                    </Card>

                    {/* Disposed Cases Card */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-green-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                                Disposed Cases
                            </CardTitle>
                            <Archive className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-gray-800">{loading ? "..." : stats.disposed_cases}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Property disposal completed
                            </p>
                        </CardContent>
                    </Card>

                    {/* Pending Cases Card */}
                    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-red-500">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                                Pending Cases
                            </CardTitle>
                            <Clock className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-gray-800">{loading ? "..." : stats.pending_cases}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Action required
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Properties Table */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="border-b bg-gray-50/50">
                        <CardTitle className="text-lg font-bold text-gray-800">Recent Seized Properties</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3">Property ID</th>
                                        <th className="px-6 py-3">Category</th>
                                        <th className="px-6 py-3">Description</th>
                                        <th className="px-6 py-3">Location</th>
                                        <th className="px-6 py-3">QR Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentProperties.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                No properties recorded yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        recentProperties.map((prop) => (
                                            <tr key={prop.id} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">#{prop.id}</td>
                                                <td className="px-6 py-4">{prop.category}</td>
                                                <td className="px-6 py-4 truncate max-w-[200px]">{prop.description}</td>
                                                <td className="px-6 py-4">{prop.location}</td>
                                                <td className="px-6 py-4">
                                                    {prop.qr_code ? (
                                                        <img
                                                            src={prop.qr_code}
                                                            alt="QR Code"
                                                            className="h-16 w-16 object-contain border p-1 rounded bg-white"
                                                        />
                                                    ) : (
                                                        <span className="text-xs text-red-400">Not Generated</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

            </main>
        </div>
    )
}