from optparse import OptionParser

### parsing command
usage = "usage: python gen_arithmetic_tests.py -i <inputfile> -o <outputfile>"
parser = OptionParser(usage=usage)
parser.add_option("-i",
	metavar="FILE", 
	dest="input_filename", 
	help="file input with format: 1 + 2 = -> 3")
parser.add_option("-o",
	metavar="FILE", 
	dest="output_filename", 
	help="file output in jest way")
(options, args) = parser.parse_args()
if options.input_filename is None or options.output_filename is None:
	parser.print_help()

### define button informations
btn_str = [
	"rows.at(0).find(CalcButton).at(0)", 
	"rows.at(0).find(CalcButton).at(1)",
	"rows.at(0).find(CalcButton).at(2)",
	"rows.at(0).find(CalcButton).at(3)",
	"rows.at(1).find(CalcButton).at(0)",
	"rows.at(1).find(CalcButton).at(1)",
	"rows.at(1).find(CalcButton).at(2)",
	"rows.at(1).find(CalcButton).at(3)",
	"rows.at(2).find(CalcButton).at(0)",
	"rows.at(2).find(CalcButton).at(1)",
	"rows.at(2).find(CalcButton).at(2)",
	"rows.at(2).find(CalcButton).at(3)",
	"rows.at(3).find(CalcButton).at(0)",
	"rows.at(3).find(CalcButton).at(1)",
	"rows.at(3).find(CalcButton).at(2)",
	"rows.at(3).find(CalcButton).at(3)",
	"rows.at(4).find(CalcButton).at(0)",
	"rows.at(4).find(CalcButton).at(1)",
	"rows.at(4).find(CalcButton).at(2)"
]

def index(argument):
	switcher = {
		"AC": 0, 
		"+/-": 1,
		"%": 2,
		"/": 3,
		"7": 4,
		"8": 5,
		"9": 6,
		"x": 7,
		"4": 8,
		"5": 9,
		"6": 10,
		"-": 11,
		"1": 12,
		"2": 13,
		"3": 14,
		"+": 15,
		"0": 16,
		".": 17,
		"=": 18
	}
	return switcher.get(argument, -1)

### gen code from input file
fin = open(options.input_filename, "r")
fout = open(options.output_filename, "w")

count = 1

fout.write("import React from 'react';\n\
import { mount } from 'enzyme';\n\n\
import CalcApp from '../CalcApp';\n\
import CalcButton from '../CalcButton';\n\n\
")

for line in fin:
	created = [False] * 19
	btns = line.split()

	fout.write("it('testing ")
	fout.write(line.rstrip('\n'))
	fout.write("', () => {\n")
	fout.write("  const app = mount(<CalcApp />);\n\n")
	fout.write("  const rows = app.find('.calc-row');\n")
  
	for btn in btns:
		if btn == "->":
			break

		try: 
			if index(btn) == -1:
				raise Exception(btn)
		except Exception as e:
			print "Error input: \"" + e.args[0] + "\" in line " + str(count)

		if created[index(btn)] == False:
			created[index(btn)] = True
			fout.write("  const btn")
			fout.write(str(index(btn)))
			fout.write(" = ")
			fout.write(btn_str[index(btn)])
			fout.write(";\n")

	fout.write("\n")

	for btn in btns:
		if btn == "->":
			break
		fout.write("  btn")
		fout.write(str(index(btn)))
		fout.write(".simulate('click');\n")

	fout.write("\n")
	fout.write("  expect(app.find('.calc-display').text()).toBe('")
	fout.write(btns[-1])
	fout.write("');\n});\n\n")

	count += 1
