# -*- encoding: utf-8 -*-
# stub: namae 1.0.1 ruby lib

Gem::Specification.new do |s|
  s.name = "namae".freeze
  s.version = "1.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Sylvester Keil".freeze, "Dan Collis-Puro".freeze]
  s.date = "2018-01-08"
  s.description = " Namae (\u540D\u524D) is a parser for human names. It recognizes personal names of various cultural backgrounds and tries to split them into their component parts (e.g., given and family names, honorifics etc.). ".freeze
  s.email = ["sylvester@keil.or.at".freeze, "dan@collispuro.com".freeze]
  s.extra_rdoc_files = ["README.md".freeze]
  s.files = ["README.md".freeze]
  s.homepage = "https://github.com/berkmancenter/namae".freeze
  s.licenses = ["AGPL-3.0".freeze]
  s.rubygems_version = "3.0.3.1".freeze
  s.summary = "Namae (\u540D\u524D) parses personal names and splits them into their component parts.".freeze

  s.installed_by_version = "3.0.3.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<racc>.freeze, ["~> 1.4"])
    else
      s.add_dependency(%q<racc>.freeze, ["~> 1.4"])
    end
  else
    s.add_dependency(%q<racc>.freeze, ["~> 1.4"])
  end
end
