import { useState } from 'react'
import axios from 'axios'
import { Header } from '@/components/header'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2 } from 'lucide-react'

export default function CaseEntryPage() {
    const [caseData, setCaseData] = useState({
        police_station: '',
        investigating_officer_name: '',
        investigating_officer_id: '',
        crime_number: '',
        crime_year: new Date().getFullYear(),
        date_of_fir: '',
        date_of_seizure: '',
        act_and_law: '',
        section_of_law: '',
        status: 'PENDING'
    })

    const [properties, setProperties] = useState([
        {
            category: '',
            belonging_to: 'UNKNOWN',
            nature_of_property: '',
            quantity_units: '',
            location: '',
            description: '',
            photo: null
        }
    ])

    const addPropertyRow = () => {
        setProperties([...properties, {
            category: '', belonging_to: 'UNKNOWN', nature_of_property: '',
            quantity_units: '', location: '', description: '', photo: null
        }])
    }

    const removePropertyRow = (index) => {
        if (properties.length > 1) {
            setProperties(properties.filter((_, i) => i !== index))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const caseResponse = await axios.post('http://127.0.0.1:8000/api/inventory/cases/', caseData)
            const caseId = caseResponse.data.id

            for (const prop of properties) {
                const formData = new FormData()
                formData.append('case', caseId)
                formData.append('category', prop.category)
                formData.append('belonging_to', prop.belonging_to)
                formData.append('nature_of_property', prop.nature_of_property)
                formData.append('quantity_units', prop.quantity_units)
                formData.append('location', prop.location)
                formData.append('description', prop.description)

                if (prop.photo) {
                    formData.append('photo', prop.photo)
                }

                await axios.post('http://127.0.0.1:8000/api/inventory/properties/', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            }

            alert("Saved Successfully!")
            window.location.href = '/dashboard'

        } catch (error) {
            console.error(error)
            alert("Error saving data.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            <Header />

            <div className="container mx-auto p-4 md:p-8 max-w-5xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-yellow-500 pl-4">
                    New Case Entry
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card>
                        <CardHeader className="bg-gray-100/50">
                            <CardTitle className="text-lg">Case Details</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                            <div className="grid gap-2">
                                <Label>Police Station</Label>
                                <Input value={caseData.police_station} onChange={(e) => setCaseData({ ...caseData, police_station: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Crime Number</Label>
                                <Input value={caseData.crime_number} onChange={(e) => setCaseData({ ...caseData, crime_number: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Year</Label>
                                <Input type="number" value={caseData.crime_year} onChange={(e) => setCaseData({ ...caseData, crime_year: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Date of FIR</Label>
                                <Input type="date" value={caseData.date_of_fir} onChange={(e) => setCaseData({ ...caseData, date_of_fir: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Date of Seizure</Label>
                                <Input type="date" value={caseData.date_of_seizure} onChange={(e) => setCaseData({ ...caseData, date_of_seizure: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select onValueChange={(val) => setCaseData({ ...caseData, status: val })} defaultValue={caseData.status}>
                                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PENDING">Pending</SelectItem>
                                        <SelectItem value="DISPOSED">Disposed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="bg-gray-100/50">
                            <CardTitle className="text-lg">Investigating Officer & Legal</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                            <div className="grid gap-2">
                                <Label>Officer Name</Label>
                                <Input value={caseData.investigating_officer_name} onChange={(e) => setCaseData({ ...caseData, investigating_officer_name: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Officer ID / Badge No</Label>
                                <Input value={caseData.investigating_officer_id} onChange={(e) => setCaseData({ ...caseData, investigating_officer_id: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Act & Law</Label>
                                <Input placeholder="e.g. IPC" value={caseData.act_and_law} onChange={(e) => setCaseData({ ...caseData, act_and_law: e.target.value })} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Section of Law</Label>
                                <Input placeholder="e.g. 379" value={caseData.section_of_law} onChange={(e) => setCaseData({ ...caseData, section_of_law: e.target.value })} required />
                            </div>
                        </CardContent>
                    </Card>

                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Seized Properties</h2>
                            <Button type="button" onClick={addPropertyRow} variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
                                <Plus className="w-4 h-4 mr-2" /> Add Property
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {properties.map((prop, index) => (
                                <Card key={index} className="border-l-4 border-l-blue-500">
                                    <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="grid gap-2">
                                            <Label>Category</Label>
                                            <Input
                                                value={prop.category}
                                                onChange={(e) => {
                                                    const newProps = [...properties]
                                                    newProps[index].category = e.target.value
                                                    setProperties(newProps)
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Belonging To</Label>
                                            <Select value={prop.belonging_to} onValueChange={(val) => {
                                                const newProps = [...properties]
                                                newProps[index].belonging_to = val
                                                setProperties(newProps)
                                            }}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="ACCUSED">Accused</SelectItem>
                                                    <SelectItem value="COMPLAINANT">Complainant</SelectItem>
                                                    <SelectItem value="UNKNOWN">Unknown</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Nature</Label>
                                            <Input
                                                value={prop.nature_of_property}
                                                onChange={(e) => {
                                                    const newProps = [...properties]
                                                    newProps[index].nature_of_property = e.target.value
                                                    setProperties(newProps)
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Quantity / Units</Label>
                                            <Input
                                                value={prop.quantity_units}
                                                onChange={(e) => {
                                                    const newProps = [...properties]
                                                    newProps[index].quantity_units = e.target.value
                                                    setProperties(newProps)
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Location</Label>
                                            <Input
                                                value={prop.location}
                                                onChange={(e) => {
                                                    const newProps = [...properties]
                                                    newProps[index].location = e.target.value
                                                    setProperties(newProps)
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label>Description</Label>
                                            <Input
                                                value={prop.description}
                                                onChange={(e) => {
                                                    const newProps = [...properties]
                                                    newProps[index].description = e.target.value
                                                    setProperties(newProps)
                                                }}
                                                required
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Photo</Label>
                                            <Input
                                                type="file"
                                                onChange={(e) => {
                                                    const newProps = [...properties]
                                                    newProps[index].photo = e.target.files[0]
                                                    setProperties(newProps)
                                                }}
                                            />
                                        </div>

                                        {properties.length > 1 && (
                                            <div className="flex items-end justify-end">
                                                <Button type="button" variant="ghost" className="text-red-500" onClick={() => removePropertyRow(index)}>
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button type="button" variant="ghost" onClick={() => window.location.href = '/dashboard'}>Cancel</Button>
                        <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white min-w-[200px]">
                            Submit Case Record
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
