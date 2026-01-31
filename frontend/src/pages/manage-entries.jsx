import { useState, useEffect } from 'react'
import axios from 'axios'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Printer, FileText } from 'lucide-react'

export default function ManageEntriesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [cases, setCases] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedCase, setSelectedCase] = useState(null)
    const [expandedCaseId, setExpandedCaseId] = useState(null)

    // Fetching cases (handling filter with query input)
    const fetchCases = async (query = '') => {
        setLoading(true)
        try {
            const url = query
                ? `http://127.0.0.1:8000/api/inventory/cases/?search=${query}`
                : 'http://127.0.0.1:8000/api/inventory/cases/'
            const res = await axios.get(url)
            setCases(res.data)
        } catch (error) {
            console.error("Failed to fetch cases", error)
        } finally {
            setLoading(false)
        }
    }

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchCases(searchTerm)
        }, 500)

        return () => clearTimeout(timer)
    }, [searchTerm])

    return (
        <div className="min-h-screen bg-gray-50 font-sans print:bg-white">
            <div className="print:hidden">
                <Header />
            </div>

            <main className="w-full px-6 py-8 print:p-0">
                <div className="flex items-center justify-between mb-8 print:hidden">
                    <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-yellow-500 pl-4">
                        Manage Entries
                    </h2>

                    <div className="flex gap-4 w-1/3">
                        <div className="relative w-full">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                className="pl-8 bg-white"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Table for Screen View (Hidden on Print) */}
                <div className="grid gap-6 print:hidden">
                    <Card className="bg-white border border-gray-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-700">Case Records</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3">Crime No.</th>
                                        <th className="px-6 py-3">Police Station</th>
                                        <th className="px-6 py-3">IO Name</th>
                                        <th className="px-6 py-3">Date Seized</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="6" className="text-center py-4">Loading...</td></tr>
                                    ) : cases.length === 0 ? (
                                        <tr><td colSpan="6" className="text-center py-4">No records found.</td></tr>
                                    ) : (
                                        cases.map((c) => (
                                            <>
                                                <tr
                                                    key={c.id}
                                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => setExpandedCaseId(expandedCaseId === c.id ? null : c.id)}
                                                >
                                                    <td className="px-6 py-4 font-medium">{c.crime_number}/{c.crime_year}</td>
                                                    <td className="px-6 py-4">{c.police_station}</td>
                                                    <td className="px-6 py-4">{c.investigating_officer_name}</td>
                                                    <td className="px-6 py-4">{c.date_of_seizure}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                                            }`}>
                                                            {c.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                setSelectedCase(c)
                                                                setTimeout(() => window.print(), 100)
                                                            }}
                                                        >
                                                            <Printer className="h-4 w-4 mr-1" /> Print Evidence
                                                        </Button>
                                                    </td>
                                                </tr>
                                                {/* Expanded Details Row */}
                                                {expandedCaseId === c.id && (
                                                    <tr className="bg-gray-50">
                                                        <td colSpan="6" className="p-4">
                                                            <div className="border rounded-md bg-white p-4">
                                                                <h4 className="font-semibold mb-2 text-gray-700">Seized Properties</h4>
                                                                {c.properties && c.properties.length > 0 ? (
                                                                    <div className="grid gap-4 md:grid-cols-2">
                                                                        {c.properties.map((p) => (
                                                                            <div key={p.id} className="flex items-start gap-4 border p-3 rounded-md">
                                                                                <div className="h-20 w-20 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden border">
                                                                                    {p.qr_code ? (
                                                                                        <img src={p.qr_code} alt="QR" className="h-full w-full object-contain" />
                                                                                    ) : (
                                                                                        <span className="text-xs text-gray-400">No QR</span>
                                                                                    )}
                                                                                </div>
                                                                                <div>
                                                                                    <p className="font-medium text-sm">{p.category} - {p.quantity_units}</p>
                                                                                    <p className="text-xs text-gray-500 mt-1">{p.description}</p>
                                                                                    <p className="text-xs font-mono bg-gray-100 inline-block px-1 mt-2 rounded">
                                                                                        Loc: {p.location}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ) : (
                                                                    <p className="text-sm text-gray-500 italic">No properties recorded.</p>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </div>

                {/* PRINT ONLY VIEW */}
                {selectedCase && (
                    <div className="hidden print:block text-black">
                        <div className="text-center border-b pb-6 mb-6">
                            <h1 className="text-3xl font-bold uppercase tracking-wide">Department of Justice</h1>
                            <h2 className="text-xl font-semibold mt-2">E-Malkhana Case Evidence Report</h2>
                            <p className="text-sm text-gray-600 mt-1">Generated on {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="mb-8 border p-4 rounded-md">
                            <h3 className="text-lg font-bold border-b pb-2 mb-4">Case Details</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div><span className="font-semibold">Crime Number:</span> {selectedCase.crime_number}/{selectedCase.crime_year}</div>
                                <div><span className="font-semibold">Police Station:</span> {selectedCase.police_station}</div>
                                <div><span className="font-semibold">IO Name:</span> {selectedCase.investigating_officer_name}</div>
                                <div><span className="font-semibold">Date Seized:</span> {selectedCase.date_of_seizure}</div>
                                <div><span className="font-semibold">Act & Law:</span> {selectedCase.act_and_law} ({selectedCase.section_of_law})</div>
                                <div><span className="font-semibold">Status:</span> {selectedCase.status}</div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold border-b pb-2 mb-4">Seized Properties Inventory</h3>
                            {selectedCase.properties && selectedCase.properties.length > 0 ? (
                                <table className="w-full text-sm border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border p-2 text-left">ID</th>
                                            <th className="border p-2 text-left">Category</th>
                                            <th className="border p-2 text-left">Description</th>
                                            <th className="border p-2 text-left">Quantity</th>
                                            <th className="border p-2 text-left">Location</th>
                                            <th className="border p-2 text-center">QR Code</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedCase.properties.map((p) => (
                                            <tr key={p.id}>
                                                <td className="border p-2">#{p.id}</td>
                                                <td className="border p-2">{p.category}</td>
                                                <td className="border p-2">{p.description}</td>
                                                <td className="border p-2">{p.quantity_units}</td>
                                                <td className="border p-2">{p.location}</td>
                                                <td className="border p-2 text-center">
                                                    {p.qr_code ? (
                                                        <img src={p.qr_code} alt="QR" className="h-16 w-16 inline-block object-contain" />
                                                    ) : (
                                                        <span className="text-xs text-gray-400">No QR</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="italic text-gray-500">No properties associated with this case.</p>
                            )}
                        </div>

                        <div className="mt-12 pt-8 border-t flex justify-between text-sm">
                            <div className="text-center">
                                <p className="mb-8">__________________________</p>
                                <p>Signature of IO</p>
                            </div>
                            <div className="text-center">
                                <p className="mb-8">__________________________</p>
                                <p>Malkhana In-Charge</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <div className="print:hidden">
                <Footer />
            </div>
        </div>
    )
}
