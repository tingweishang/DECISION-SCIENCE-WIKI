import PDFKit
import Foundation
let base = URL(fileURLWithPath: CommandLine.arguments[1])
var all: [[[String: Any]]] = []
for i in 1...6 {
    guard let doc = PDFDocument(url: base.appendingPathComponent("Lecture \(i).pdf")), doc.pageCount > 0 else {
        fatalError("Cannot open lecture \(i)")
    }
    all.append((0..<doc.pageCount).map { ["page": $0 + 1, "text": doc.page(at: $0)?.string ?? ""] })
}
FileHandle.standardOutput.write(try JSONSerialization.data(withJSONObject: all, options: [.prettyPrinted, .sortedKeys]))
