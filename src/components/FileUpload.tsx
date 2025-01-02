import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Search, FileText, Download, Trash2, Eye } from "lucide-react";
import { useState } from "react";

export const FileUpload = () => {
  const [files] = useState([
    { 
      id: 1,
      name: "Site Plans.pdf", 
      size: "2.5 MB", 
      date: "2024-03-20",
      type: "PDF",
      uploadedBy: "John Smith",
      category: "Documentation",
      downloads: 12
    },
    { 
      id: 2,
      name: "Safety Protocol.docx", 
      size: "1.2 MB", 
      date: "2024-03-19",
      type: "DOCX",
      uploadedBy: "Sarah Johnson",
      category: "Safety",
      downloads: 8
    },
    { 
      id: 3,
      name: "Budget Report.xlsx", 
      size: "3.8 MB", 
      date: "2024-03-18",
      type: "XLSX",
      uploadedBy: "Mike Williams",
      category: "Financial",
      downloads: 15
    }
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search files..." 
              className="pl-8"
              type="search"
            />
          </div>
          <Button variant="outline">Category</Button>
          <Button variant="outline">Date</Button>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Upload className="mr-2 h-4 w-4" /> Upload Files
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Repository</CardTitle>
          <CardDescription>Manage and organize project files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {file.category} • Uploaded by {file.uploadedBy}
                    </p>
                  </div>
                </div>
                <div className="text-right mr-4">
                  <p className="text-sm font-medium">{file.size}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(file.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right mr-4">
                  <p className="text-sm font-medium">{file.downloads} downloads</p>
                  <p className="text-sm text-gray-500">{file.type}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};