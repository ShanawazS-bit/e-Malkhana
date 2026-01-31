import { useState, useEffect } from 'react'
import { Settings, Type, Sun, Moon, Link, Eye, EyeOff, MousePointer } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function AccessibilityTools() {
    const [settings, setSettings] = useState({
        highContrast: false,
        invertColors: false,
        desaturate: false,
        textSpacing: false,
        lineHeight: false,
        bigCursor: false,
        hideImages: false,
        fontSize: 'normal' // normal, large, larger
    })

    // Apply classes to body
    useEffect(() => {
        const body = document.body

        // Reset classes first (simple approach) or toggle specifically
        body.classList.toggle('high-contrast', settings.highContrast)
        body.classList.toggle('invert-colors', settings.invertColors)
        body.classList.toggle('desaturate', settings.desaturate)
        body.classList.toggle('text-spacing', settings.textSpacing)
        body.classList.toggle('line-height', settings.lineHeight)
        body.classList.toggle('big-cursor', settings.bigCursor)
        body.classList.toggle('hide-images', settings.hideImages)

        // Font Size Logic
        body.classList.remove('text-lg', 'text-xl')
        if (settings.fontSize === 'large') body.classList.add('text-lg')
        if (settings.fontSize === 'larger') body.classList.add('text-xl')

    }, [settings])

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const setFontSize = (size) => {
        setSettings(prev => ({ ...prev, fontSize: size }))
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-blue-900 hover:bg-blue-50" title="Accessibility Tools">
                    <span className="sr-only">Accessibility Tools</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-accessibility">
                        <circle cx="16" cy="4" r="1" />
                        <path d="m18 19 1-7-6 1" />
                        <path d="m5 8 3-3 5.5 3-2.36 4.5" />
                        <path d="M8 19l-3 3" />
                        <circle cx="12" cy="12" r="10" />
                    </svg>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-white border border-gray-200 shadow-lg" align="end">
                <div className="space-y-4">
                    <h3 className="font-bold text-center border-b pb-2">Accessibility Tools</h3>

                    {/* Contrast Section */}
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Color Contrast</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <ToolButton
                                icon={<Sun className="h-4 w-4" />}
                                label="High Contrast"
                                active={settings.highContrast}
                                onClick={() => toggleSetting('highContrast')}
                            />
                            <ToolButton
                                icon={<Settings className="h-4 w-4" />}
                                label="Normal"
                                active={!settings.highContrast && !settings.invertColors}
                                onClick={() => setSettings(prev => ({ ...prev, highContrast: false, invertColors: false, desaturate: false }))}
                            />
                            <ToolButton
                                icon={<Link className="h-4 w-4" />}
                                label="Highlight Links"
                                active={false} // Placeholder for future
                                onClick={() => { }}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <ToolButton
                                icon={<Moon className="h-4 w-4" />}
                                label="Invert"
                                active={settings.invertColors}
                                onClick={() => toggleSetting('invertColors')}
                            />
                            <ToolButton
                                icon={<div className="h-4 w-4 rounded-full bg-gradient-to-r from-gray-500 to-white border" />}
                                label="Saturation"
                                active={settings.desaturate}
                                onClick={() => toggleSetting('desaturate')}
                            />
                        </div>
                    </div>

                    {/* Text Size */}
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Text Size</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <ToolButton label="A+" active={settings.fontSize === 'larger'} onClick={() => setFontSize('larger')} />
                            <ToolButton label="A-" active={settings.fontSize === 'normal'} onClick={() => setFontSize('normal')} />
                            <ToolButton label="A" active={settings.fontSize === 'large'} onClick={() => setFontSize('large')} />
                        </div>
                    </div>

                    {/* Others */}
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Others</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <ToolButton icon={<Type className="h-4 w-4" />} label="Text Spacing" active={settings.textSpacing} onClick={() => toggleSetting('textSpacing')} />
                            <ToolButton icon={<Type className="h-4 w-4" />} label="Line Height" active={settings.lineHeight} onClick={() => toggleSetting('lineHeight')} />
                            <ToolButton icon={<EyeOff className="h-4 w-4" />} label="Hide Images" active={settings.hideImages} onClick={() => toggleSetting('hideImages')} />
                            <ToolButton icon={<MousePointer className="h-4 w-4" />} label="Big Cursor" active={settings.bigCursor} onClick={() => toggleSetting('bigCursor')} />
                        </div>
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    )
}

function ToolButton({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center p-2 rounded border text-xs transition-colors h-16
                ${active ? 'bg-blue-100 border-blue-500 text-blue-800 font-medium' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}
            `}
        >
            {icon && <div className="mb-1">{icon}</div>}
            <span>{label}</span>
        </button>
    )
}
