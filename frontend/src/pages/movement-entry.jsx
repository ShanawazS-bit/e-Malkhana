import { useState, useEffect } from 'react'
import axios from 'axios'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight } from 'lucide-react'

export default function MovementEntryPage() {
    const [properties, setProperties] = useState([])
    const [selectedPropertyId, setSelectedPropertyId] = useState('')
    const [movementData, setMovementData] = useState({
        property: '',
        from_location: '',
        to_location: '',
        purpose: '',
        remarks: ''
    })

    // Fetch properties on load
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/inventory/properties/')
                setProperties(res.data)
            } catch (error) {
                console.error("Failed to fetch properties", error)
            }
        }
        fetchProperties()
    }, [])

    useEffect(() => {
        if (selectedPropertyId) {
            const prop = properties.find(p => p.id === parseInt(selectedPropertyId))
            if (prop) {
                setMovementData(prev => ({
                    ...prev,
                    property: selectedPropertyId,
                    from_location: prop.location // Auto-fill current location
                }))
            }
        }
    }, [selectedPropertyId, properties])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/api/inventory/movements/', movementData)
            alert("Movement Logged Successfully!")
            window.location.href = '/dashboard'
        } catch (error) {
            console.error("Failed to log movement", error)
            alert("Error logging movement.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            <Header />

            <div className="container mx-auto p-4 md:p-8 max-w-2xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-yellow-500 pl-4">
                    Log property movement
                </h1>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader className="bg-gray-100/50">
                            <CardTitle className="text-lg">Chain of Custody Form</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 pt-6">

                            <div className="grid gap-2">
                                <Label>Select Property</Label>
                                <Select onValueChange={setSelectedPropertyId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a generic property..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {properties.map(p => (
                                            <SelectItem key={p.id} value={p.id.toString()}>
                                                #{p.id} - {p.category} ({p.quantity_units})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>From Location / Officer</Label>
                                    <Input
                                        value={movementData.from_location}
                                        onChange={(e) => setMovementData({ ...movementData, from_location: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>To Location / Officer</Label>
                                    <Input
                                        value={movementData.to_location}
                                        onChange={(e) => setMovementData({ ...movementData, to_location: e.target.value })}
                                        required
                                        className="border-yellow-500"
                                    />
                                </div>
                            </div>

                            {/* Purpose */}
                            <div className="grid gap-2">
                                <Label>Purpose of Movement</Label>
                                <Select onValueChange={(val) => setMovementData({ ...movementData, purpose: val })}>
                                    <SelectTrigger><SelectValue placeholder="Select Purpose" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="COURT">Production in Court</SelectItem>
                                        <SelectItem value="FSL">Forensic Lab (FSL)</SelectItem>
                                        <SelectItem value="STORAGE">Return to Storage</SelectItem>
                                        <SelectItem value="INSPECTION">Officer Inspection</SelectItem>
                                        <SelectItem value="OTHER">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Remarks */}
                            <div className="grid gap-2">
                                <Label>Remarks</Label>
                                <Input
                                    placeholder="Any notes..."
                                    value={movementData.remarks}
                                    onChange={(e) => setMovementData({ ...movementData, remarks: e.target.value })}
                                />
                            </div>

                            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white mt-4">
                                Log Movement <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>

                        </CardContent>
                    </Card>
                </form>
            </div>
            <Footer />
        </div>
    )
}
