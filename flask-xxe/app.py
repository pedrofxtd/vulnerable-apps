from flask import Flask, request, render_template
from lxml import etree

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        xml_file = request.files["xmlfile"]
        xml_data = xml_file.read()
        parser = etree.XMLParser(resolve_entities=True)
        root = etree.fromstring(xml_data, parser)
        return f"<pre>{etree.tostring(root, pretty_print=True).decode()}</pre>"

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
