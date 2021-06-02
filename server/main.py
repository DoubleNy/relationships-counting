import xml.dom.minidom
import xml.etree.ElementTree as ElementTree
from flask import Flask
from flask import request

import json

app = Flask(__name__)

FOLDER_URL = 'files'

doc = None

def find_rec(node, element):
    for item in node.findall(element):
        yield item
        for child in find_rec(item, element):
            yield child


# A deprel count and count over all rel.
# B count postags edges over heads

def get_deprel_summaries(doc):
    treebank = doc.getroot()

    words = list(treebank.iter('word'))

    deprelFreq = dict()
    deprelTotalSum = 0

    for word in words:
        if 'deprel' not in word.attrib.keys():
            continue

        rel = word.attrib['deprel']

        if rel not in deprelFreq.keys():
            deprelFreq[word.attrib['deprel']] = 0
        else:
            deprelFreq[word.attrib['deprel']] += 1
            deprelTotalSum += 1

    return deprelFreq, deprelTotalSum


def dfs(words_in_sentence, bindigsFreq):
    bindingsCount = 0

    for word in words_in_sentence:
        if word.attrib['id'] == '0':
            continue

        desc = get_node_with_attribute(words_in_sentence, 'id', word.attrib['head'])

        if desc is None:
            continue

        word_postag = word.attrib['postag']
        desc_postag = desc.attrib['postag']

        touple = (word_postag, desc_postag)

        if touple not in bindigsFreq.keys():
                bindigsFreq[touple] = 1
                bindingsCount += 1
        else:
                bindigsFreq[touple] += 1
                bindingsCount += 1

    return bindingsCount


def get_node_with_attribute(nodes, attribute, value):
    for x in nodes:
        if x.attrib[attribute] == value:
            return x


def get_deprel_bindings(doc):
    treebank = doc.getroot()

    sentences = list(treebank.iter('sentence'))

    bindingsFreq = dict()
    total_bindings_count = 0

    for sentence in sentences:
        words_in_sentence = list(sentence.iter('word'))
        bindingsCount = dfs(words_in_sentence, bindingsFreq)

        total_bindings_count += bindingsCount
        # for binding in bindingsFreq.keys():
        #     print(binding, bindingsFreq[binding])

    return bindingsFreq, total_bindings_count

@app.route("/relationships")
def relationships():
    global doc

    if not isinstance(doc, ElementTree.ElementTree):
        return json.dumps({})

    deprelFreq, deprelTotalCount = get_deprel_summaries(doc)

    list = []

    for rel in deprelFreq:
        list.append({
            'relationship': rel,
            'count': deprelFreq[rel]
        })

    return json.dumps({
        'freq': list,
        'total_count': deprelTotalCount
    })


@app.route("/bindings")
def bindings():
    global doc

    if not isinstance(doc, ElementTree.ElementTree):
        return json.dumps({})

    deprelBindingsFreq, totalBindings = get_deprel_bindings(doc)
    #
    list = []

    for tuple in deprelBindingsFreq.keys():
        list.append({
            'from': tuple[0],
            'to': tuple[1],
            'label': f"{tuple[0]}->{tuple[1]}",
            'count': deprelBindingsFreq[tuple]
        })

    return json.dumps({
        'freq': list[:250],
        'total_count': totalBindings
    })


@app.route("/file", methods=['POST'])
def file():
    global doc

    try:
        doc = ElementTree.ElementTree(ElementTree.fromstring(request.data))
    except:
        pass

    return json.dumps({})


if __name__ == '__main__':
    app.run(debug=True)
    #
    # deprelFreq, deprelTotalCount = get_deprel_summaries(doc)
    # deprelBindingsFreq, totalBindings = get_deprel_bindings(doc)
    #
    # print(deprelTotalCount)
    # print(totalBindings)